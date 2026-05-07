import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAcademyData } from "@/hooks/useAcademyData";
import { toast } from "sonner";
import { 
  Loader2 as Loader2Icon, 
  ArrowLeft as ArrowLeftIcon, 
  CheckCircle2 as CheckCircle2Icon, 
  Upload as UploadIcon, 
  FileText as FileTextIcon, 
  X as XIcon, 
  BookOpen as BookOpenIcon, 
  Code as CodeIcon, 
  Briefcase as BriefcaseIcon,
  Users as UsersIcon 
} from "lucide-react";
import logo from "@/assets/logo_transparent.png";

export default function Auth() {
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'employer' | 'freelancer' | 'referrer'>('student');
  const [referralCode, setReferralCode] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const [persistSession, setPersistSession] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  
  // New State for Registration Course Selection
  const { courses } = useAcademyData();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [currency, setCurrency] = useState<'USD' | 'KES' | 'GHS'>('USD');
  const [exchangeRates, setExchangeRates] = useState({ KES: 130, GHS: 14.5 });

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setExchangeRates({
            KES: data.rates.KES || 130,
            GHS: data.rates.GHS || 14.5
          });
        }
      })
      .catch(console.error);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && user) {
      setIsClearing(true);
      const from = (location.state as any)?.from?.pathname || "/academy";
      setTimeout(() => navigate(from, { replace: true }), 1800);
    }
  }, [user, authLoading, navigate, location]);

  const getCoursePrice = (courseId: string) => {
    const c = courses.find(course => course.id === courseId);
    if (!c) return 50;
    if (c.title.toLowerCase().includes("teacher")) return 1500;
    if (c.title.toLowerCase().includes("mastering freelancing")) return 100;
    return 50;
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Reset link sent!", { description: "Check your email for the recovery link." });
      setIsForgotPassword(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initiateRegistrationPayment = () => {
    if (!email || !password || !fullName || !phone || !city || !country || !nationalId) {
      toast.error("Please fill in all required fields (Name, Phone, City, Country, ID).");
      return;
    }
    if (!selectedCourse) {
      toast.error("Please select a program to enroll in.");
      return;
    }

    const courseObj = courses.find(c => c.id === selectedCourse);
    let basePrice = 50;
    if (courseObj?.title.toLowerCase().includes("mastering freelancing")) basePrice = 100;
    if (courseObj?.title.toLowerCase().includes("teacher preparation")) basePrice = 1500;
    
    let amount = basePrice * 100;
    if (currency === 'KES') amount = Math.round(basePrice * exchangeRates.KES) * 100;
    if (currency === 'GHS') amount = Math.round(basePrice * exchangeRates.GHS) * 100;

    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!paystackKey) { 
      toast.error("Payment configuration error."); 
      return; 
    }

    if ((window as any).PaystackPop) {
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey, 
        email: email, 
        amount, 
        currency,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ref: 'ST9_REG_' + Math.floor(Math.random() * 1e9),
        callback: async (response: any) => {
          try {
            toast.success("Payment successful! Verifying...");
            const { data, error } = await supabase.functions.invoke('verify-payment', {
              body: { reference: response.reference }
            });

            if (error) throw error;
            
            if (data?.status && data?.data?.status === 'success') {
              toast.success("Payment verified! Creating your account...");
              await executeSignup();
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error: any) {
             toast.error("Could not verify payment: " + error.message);
          }
        },
        onClose: () => {
          toast.error("Payment cancelled. Account creation paused.");
        }
      });
      handler.openIframe();
    } else {
      toast.error("Payment gateway is not ready. Please try again.");
    }
  };

  const executeSignup = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone_number: phone,
            city: city,
            role: selectedRole,
            referred_by_code: referralCode
          }
        }
      });
      if (error) throw error;

      if (data.user) {
        // Handle Supabase email enumeration protection (fake success for existing emails)
        if (data.user.identities && data.user.identities.length === 0) {
          throw new Error("This email is already registered. Please log in instead.");
        }

        const verificationStatus = (selectedRole === 'employer' || selectedRole === 'freelancer') ? 'pending' : 'verified';
        
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          phone_number: phone,
          city: city,
          country: country,
          national_id_passport: nationalId,
          role: selectedRole,
          verification_status: verificationStatus,
          email: email,
          updated_at: new Date().toISOString()
        });
        
        if (profileError) throw new Error("Profile creation failed: " + profileError.message);

        // Add user enrollment directly since webhook may fail due to missing user_id initially
        if (selectedCourse) {
          const { error: enrollError } = await supabase.from('user_enrollments').insert({
            user_id: data.user.id,
            course_id: selectedCourse,
            progress: 0
          });
          if (enrollError) throw new Error("Enrollment failed: " + enrollError.message);
        }

        toast.success("Account created and enrolled successfully!");
        
        if (!data.session) {
          const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          if (signInError) throw signInError;
        }
        
        setIsClearing(true);
        setTimeout(() => navigate("/academy"), 1800);
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during account creation.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (isSignUp: boolean) => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (isSignUp) {
      // Defer to the payment flow
      initiateRegistrationPayment();
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      setIsClearing(true);
      setTimeout(() => navigate("/academy"), 1800);
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      if (!isClearing) setLoading(false);
    }
  };


  if (isClearing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden relative">
        <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative size-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
               <CheckCircle2Icon className="size-10 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Welcome back!</h2>
            <p className="text-sm text-muted-foreground">Taking you to your dashboard...</p>
          </div>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-progress-fast" />
          </div>
        </div>
        <style>{`
          @keyframes progress-fast { 0% { width: 0%; } 100% { width: 100%; } }
          .animate-progress-fast { animation: progress-fast 1.8s ease-in-out forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors z-20">
        <ArrowLeftIcon className="w-4 h-4" /> Back to Home
      </Link>

      <div className="absolute hidden md:block top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      
      <div className="w-full max-w-lg p-4 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8 gap-3">
          <img src={logo} alt="Star9" className="h-12 w-auto object-contain" />
          <p className="text-sm text-muted-foreground">Sign in to access your account</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="login" className="text-sm">Log In</TabsTrigger>
                <TabsTrigger value="register" className="text-sm">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <CardHeader className="space-y-4 pb-8">
                <div className="flex justify-center mb-4">
                  <img src={logo} alt="Star9 Logo" className="h-16 w-auto" />
                </div>
                <div className="space-y-1 text-center">
                  <CardTitle className="text-3xl font-bold tracking-tighter">
                    {isForgotPassword ? "Reset Password" : "Welcome back"}
                  </CardTitle>
                  <CardDescription>
                    {isForgotPassword 
                      ? "Enter your email to receive a reset link." 
                      : "Enter your credentials to access your dashboard."
                    }
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAuth(false) }} className="h-11" />
                </div>
                {!isForgotPassword && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAuth(false) }} className="h-11" />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="persist" checked={persistSession} onCheckedChange={(checked) => setPersistSession(!!checked)} />
                        <label htmlFor="persist" className="text-sm text-muted-foreground cursor-pointer">Remember me</label>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </>
                )}
                {isForgotPassword && (
                  <button 
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    ← Back to Login
                  </button>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12" disabled={loading} onClick={() => isForgotPassword ? handleForgotPassword() : handleAuth(false)}>
                  {loading && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
                  {isForgotPassword ? "Send Reset Link" : "Log In"}
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader className="space-y-4 pb-8">
                <div className="flex justify-center mb-4">
                  <img src={logo} alt="Star9 Logo" className="h-16 w-auto" />
                </div>
                <div className="space-y-1 text-center">
                  <CardTitle className="text-3xl font-bold tracking-tighter">Create your account</CardTitle>
                  <CardDescription>Join Star9 and start building your career.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 mb-6">
                  <Label>I am a...</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'student', label: 'Student', icon: BookOpenIcon },
                      { id: 'freelancer', label: 'Expert', icon: CodeIcon },
                      { id: 'employer', label: 'Employer', icon: BriefcaseIcon },
                      { id: 'referrer', label: 'Referrer', icon: UsersIcon }
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id as any)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-2 ${
                          selectedRole === role.id 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border bg-card text-muted-foreground hover:border-border/80'
                        }`}
                      >
                        <role.icon className="size-5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{role.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input id="reg-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input id="reg-name" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number</Label>
                    <Input id="reg-phone" type="tel" placeholder="+254 117 103 483" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-city">City</Label>
                    <Input id="reg-city" type="text" placeholder="Nairobi" value={city} onChange={(e) => setCity(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-country">Country</Label>
                    <Input id="reg-country" type="text" placeholder="Kenya" value={country} onChange={(e) => setCountry(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-id">National ID / Passport</Label>
                    <Input id="reg-id" type="text" placeholder="ID Number" value={nationalId} onChange={(e) => setNationalId(e.target.value)} className="h-11" />
                  </div>
                  <div className="space-y-2 md:col-span-2 pt-2 border-t border-border mt-2">
                    <Label>Select Your Program</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Choose a program to enroll in..." />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.title} - ${getCoursePrice(c.id)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCourse && (
                    <div className="space-y-2 md:col-span-2">
                      <Label>Preferred Currency</Label>
                      <Select value={currency} onValueChange={(v: any) => setCurrency(v)}>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD (Global Card)</SelectItem>
                          <SelectItem value="KES">KES (M-Pesa)</SelectItem>
                          <SelectItem value="GHS">GHS (Airtel / MTN)</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 mt-3">
                        <p className="text-sm font-bold text-foreground">
                          Total Due Today: <span className="text-primary text-lg ml-1">
                            {currency === 'USD' ? '$' : currency === 'KES' ? 'KES ' : 'GH₵ '}
                            {currency === 'USD' ? getCoursePrice(selectedCourse).toLocaleString() : 
                             currency === 'KES' ? Math.round(getCoursePrice(selectedCourse) * exchangeRates.KES).toLocaleString() : 
                             Math.round(getCoursePrice(selectedCourse) * exchangeRates.GHS).toLocaleString()}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground pt-1">
                          Note: You will be prompted to complete payment securely via Paystack before your account is finalized.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </CardContent>
              <CardFooter className="pt-4">
                <Button className="w-full h-12" disabled={loading} onClick={() => handleAuth(true)}>
                  {loading && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
                  Pay & Create Account
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
