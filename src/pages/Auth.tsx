import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && user) {
      setIsClearing(true);
      const from = (location.state as any)?.from?.pathname || "/academy";
      setTimeout(() => navigate(from, { replace: true }), 1800);
    }
  }, [user, authLoading, navigate, location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      setReferralCode(ref);
      toast.info("Referral code applied!", { description: `You're joining via code: ${ref}` });
    }
  }, [location]);


  const handleAuth = async (isSignUp: boolean) => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (isSignUp && (!fullName || !phone || !city || !country || !nationalId)) {
      toast.error("Please fill in all required fields (Name, Phone, City, Country, ID).");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
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
          const verificationStatus = (selectedRole === 'employer' || selectedRole === 'freelancer') ? 'pending' : 'verified';
          
          await supabase.from('profiles').upsert({
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

          if (selectedRole === 'student' || selectedRole === 'referrer') {
            toast.success("Account created successfully!");
          } else {
            toast.success("Account created! Your profile is pending verification.");
          }
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        setIsClearing(true);
        setTimeout(() => navigate("/academy"), 1800);
      }
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
                  <CardTitle className="text-3xl font-bold tracking-tighter">Welcome back</CardTitle>
                  <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAuth(false) }} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAuth(false) }} className="h-11" />
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <Checkbox id="persist" checked={persistSession} onCheckedChange={(checked) => setPersistSession(!!checked)} />
                  <label htmlFor="persist" className="text-sm text-muted-foreground cursor-pointer">Remember me</label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full h-12" disabled={loading} onClick={() => handleAuth(false)}>
                  {loading && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
                  Log In
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
                </div>

              </CardContent>
              <CardFooter className="pt-4">
                <Button className="w-full h-12" disabled={loading} onClick={() => handleAuth(true)}>
                  {loading && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
                  Create Account
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
