import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { trackReferral, confirmReferralCommission } from "@/lib/referrals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAcademyData } from "@/hooks/useAcademyData";
import { toast } from "sonner";
import PaymentReceipt from "@/components/academy/PaymentReceipt";
import {
  Loader2 as Loader2Icon,
  ArrowLeft as ArrowLeftIcon,
  CheckCircle2 as CheckCircle2Icon,
  BookOpen as BookOpenIcon,
  Code as CodeIcon,
  Briefcase as BriefcaseIcon,
  Users as UsersIcon
} from "lucide-react";
import logo from "@/assets/Star9_Logo.png";

export default function Auth() {
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [idVerified, setIdVerified] = useState(false);
  const [verifyingId, setVerifyingId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'employer' | 'freelancer' | 'referrer'>('student');
  const [referralCode, setReferralCode] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const [persistSession, setPersistSession] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  // Handler for when receipt is closed - redirect to course dashboard
  const handleReceiptClose = () => {
    setShowReceipt(false);

    toast.success("🎉 You're enrolled! Lessons begin Tuesday, 12th May.", {
      description: "Taking you to your course dashboard...",
      duration: 3000,
    });

    setIsClearing(true);
    // Redirect to course dashboard
    if (selectedCourse) {
      setTimeout(() => navigate(`/academy/course/${selectedCourse}`), 1800);
    } else {
      setTimeout(() => navigate("/academy"), 1800);
    }
  };

  // New State for Registration Course Selection
  const { courses } = useAcademyData();
  const [currency, setCurrency] = useState<'USD' | 'KES' | 'GHS'>('USD');
  const [exchangeRates, setExchangeRates] = useState({ KES: 130, GHS: 14.5 });

  const navigate = useNavigate();
  const location = useLocation();

  // Get course ID from navigation state (when user clicks enroll on a course)
  const selectedCourse = (location.state as any)?.courseId || "";

  // Get default tab from URL search params (e.g., ?tab=register)
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'login';

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

  const verifyNationalId = async () => {
    setVerifyingId(true);

    try {
      // TODO: Integrate with Persona verification API
      // Example: https://docs.withpersona.com/docs/embedded-flow

      // For now, simulate the verification process
      // In production, this should call Persona's API or open their embedded flow

      toast.info("Opening Persona verification...", {
        description: "Please complete the ID verification process.",
      });

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, you would:
      // 1. Initialize Persona client with your template ID
      // 2. Open the embedded verification flow
      // 3. Persona will collect ID document and selfie
      // 4. Wait for verification completion
      // 5. Receive verification status and extracted data from webhook or callback

      // Example Persona integration (commented out):
      /*
      const client = new Persona.Client({
        templateId: import.meta.env.VITE_PERSONA_TEMPLATE_ID,
        environmentId: import.meta.env.VITE_PERSONA_ENVIRONMENT_ID,
        
        // Pre-fill with user data
        fields: {
          nameFirst: otherNames,
          nameLast: surname,
          phoneNumber: phone,
          emailAddress: email,
        },
        
        onComplete: ({ inquiryId, status, fields }) => {
          if (status === 'completed') {
            // Store the inquiry ID and extracted ID number from Persona
            setNationalId(fields.identificationNumber || inquiryId);
            setIdVerified(true);
            toast.success("ID verified successfully!");
          }
        },
        onError: (error) => {
          toast.error("Verification failed: " + error.message);
        }
      });
      client.open();
      */

      // Temporary: Simulate successful verification for demo
      setIdVerified(true);
      // Simulate extracting ID number from Persona
      setNationalId('PERSONA_VERIFIED_' + Date.now());
      toast.success("ID verified successfully!", {
        description: "Your identity has been confirmed.",
      });

    } catch (error: any) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setVerifyingId(false);
    }
  };

  const initiateRegistrationPayment = () => {
    if (!email || !password || !surname || !otherNames || !phone) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!idVerified) {
      toast.error("Please verify your ID with Persona first.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!selectedCourse) {
      toast.error("Please select a program to enroll in.");
      return;
    }

    const fullName = `${surname} ${otherNames}`.trim();

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
      console.log("🚀 INITIATING PAYSTACK POPUP:", { paystackKey, email, amount, currency });
      const handler = (window as any).PaystackPop.setup({
        key: paystackKey,
        email: email,
        amount,
        currency,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ref: 'ST9_REG_' + Math.floor(Math.random() * 1e9),
        callback: (response: any) => {
          const verifyPayment = async () => {
            try {
              toast.success("Payment successful! Verifying...");
              const { data, error } = await supabase.functions.invoke('verify-payment', {
                body: { reference: response.reference }
              });

              if (error) throw error;

              if (data?.status && data?.data?.status === 'success') {
                toast.success("Payment verified! Creating your account...");

                // Generate receipt data
                const receipt = {
                  receiptNumber: `ST9-${Date.now()}`,
                  date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  studentName: fullName,
                  email: email,
                  courseName: courseObj?.title || 'Selected Course',
                  amount: basePrice,
                  currency: currency === 'USD' ? '$' : currency === 'KES' ? 'KES' : 'GH₵',
                  paymentMethod: currency === 'USD' ? 'Card Payment' : currency === 'KES' ? 'M-Pesa' : 'Mobile Money',
                  transactionId: response.reference,
                };

                setReceiptData(receipt);
                setShowReceipt(true);

                // Execute signup and enrollment
                await executeSignup();
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (error: any) {
              toast.error("Could not verify payment: " + error.message);
            }
          };
          verifyPayment();
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
      const fullName = `${surname} ${otherNames}`.trim();

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

        // Add user enrollment directly — only for students purchasing a course
        if (selectedCourse && selectedRole === 'student') {
          const { error: enrollError } = await supabase.from('user_enrollments').insert({
            user_id: data.user.id,
            course_id: selectedCourse,
            progress: 0
          });
          if (enrollError) throw new Error("Enrollment failed: " + enrollError.message);

          // Track referral if referral code was provided
          if (referralCode && referralCode.trim()) {
            const courseObj = courses.find(c => c.id === selectedCourse);
            await trackReferral(referralCode, data.user.id, email, fullName);

            // Confirm commission immediately after enrollment
            if (courseObj) {
              let basePrice = 50;
              if (courseObj.title.toLowerCase().includes("mastering freelancing")) basePrice = 100;
              if (courseObj.title.toLowerCase().includes("teacher preparation")) basePrice = 1500;

              await confirmReferralCommission(
                data.user.id,
                selectedCourse,
                courseObj.title,
                basePrice
              );
            }
          }
        } else if (referralCode && referralCode.trim()) {
          // Track referral for non-students (employers, freelancers, referrers)
          await trackReferral(referralCode, data.user.id, email, fullName);
        }

        if (!data.session) {
          const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
          if (signInError) throw signInError;
        }

        // Don't show the clearing animation or redirect yet if we're showing a receipt
        if (!showReceipt) {
          toast.success("🎉 You're enrolled! Lessons begin Tuesday, 12th May.", {
            description: "Your account is ready. We'll see you on the 12th — get excited!",
            duration: 8000,
          });

          setIsClearing(true);
          // Redirect to course dashboard if enrolled in a course, otherwise to academy
          if (selectedCourse && selectedRole === 'student') {
            setTimeout(() => navigate(`/academy/course/${selectedCourse}`), 1800);
          } else {
            setTimeout(() => navigate("/academy"), 1800);
          }
        }
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
      // Validate all required fields for signup
      if (!surname || !otherNames || !phone) {
        toast.error("Please fill in all required fields.");
        return;
      }

      if (!idVerified && !(selectedRole === 'employer' || selectedRole === 'freelancer')) {
        toast.error("Please verify your ID with Persona first.");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }

      // Defer to the payment flow for students, otherwise create account immediately
      if (selectedRole === 'employer' || selectedRole === 'freelancer') {
        executeSignup();
      } else {
        if (!selectedCourse) {
          toast.error("Please select a program to enroll in.");
          return;
        }
        initiateRegistrationPayment();
      }
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
          <img src={logo} alt="Star9" className="h-20 md:h-24 w-auto object-contain" />
          <p className="text-sm text-muted-foreground">Sign in to access your account</p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <Tabs defaultValue={defaultTab} className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="login" className="text-sm">Log In</TabsTrigger>
                <TabsTrigger value="register" className="text-sm">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <CardHeader className="space-y-4 pb-8">
                <div className="flex justify-center mb-4">
                  <img src={logo} alt="Star9 Logo" className="h-24 w-auto object-contain" />
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
                  <img src={logo} alt="Star9 Logo" className="h-24 w-auto object-contain" />
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
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all gap-2 ${selectedRole === role.id
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
                  <div className="space-y-2">
                    <Label htmlFor="reg-surname">Surname *</Label>
                    <Input
                      id="reg-surname"
                      type="text"
                      placeholder="Doe"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-other-names">Other Names *</Label>
                    <Input
                      id="reg-other-names"
                      type="text"
                      placeholder="John"
                      value={otherNames}
                      onChange={(e) => setOtherNames(e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">Phone Number *</Label>
                    <Input
                      id="reg-phone"
                      type="tel"
                      placeholder="+254 117 103 483"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email Address *</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reg-password">Password *</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reg-referral">Referral Code (Optional)</Label>
                    <Input
                      id="reg-referral"
                      type="text"
                      placeholder="Enter referral code if you have one"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {!(selectedRole === 'employer' || selectedRole === 'freelancer') && selectedCourse && (
                    <>
                      <div className="md:col-span-2 pt-2 border-t border-border mt-2">
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                          <div className="flex items-start gap-3">
                            <BookOpenIcon className="size-5 text-primary shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground mb-1">Enrolling in:</p>
                              <p className="text-base font-bold text-primary">
                                {courses.find(c => c.id === selectedCourse)?.title || "Selected Course"}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                You'll get instant access after payment
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

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
                            You will complete payment securely via Paystack before your account is created.
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {!(selectedRole === 'employer' || selectedRole === 'freelancer') && !selectedCourse && (
                    <div className="md:col-span-2 pt-2 border-t border-border mt-2">
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                          ⚠️ Please select a course from the catalog first, then click "Enroll" to sign up.
                        </p>
                        <Button variant="outline" className="mt-3 w-full" asChild>
                          <Link to="/academy">Browse Courses</Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

              </CardContent>
              <CardFooter className="pt-4 flex-col gap-3">
                {!(selectedRole === 'employer' || selectedRole === 'freelancer') && selectedCourse && !idVerified && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 gap-2"
                    onClick={verifyNationalId}
                    disabled={verifyingId}
                  >
                    {verifyingId && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
                    {verifyingId ? "Verifying with Persona..." : "Verify ID with Persona"}
                  </Button>
                )}
                <Button
                  className="w-full h-12"
                  disabled={loading || (!(selectedRole === 'employer' || selectedRole === 'freelancer') && (!idVerified || !selectedCourse))}
                  onClick={() => handleAuth(true)}
                >
                  {loading && <Loader2Icon className="h-4 w-4 animate-spin mr-2" />}
                  {selectedRole === 'employer' || selectedRole === 'freelancer' ? "Create Account" : "Pay & Create Account"}
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Payment Receipt Modal */}
      {showReceipt && receiptData && (
        <PaymentReceipt
          receiptData={receiptData}
          onClose={handleReceiptClose}
        />
      )}
    </div>
  );
}
