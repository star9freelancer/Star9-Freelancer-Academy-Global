import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, ArrowLeft, ShieldCheck, Cpu, Database, Globe, Fingerprint } from "lucide-react";

export default function Auth() {
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [persistSession, setPersistSession] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Personnel Redirect: Instant clearance if already identified
  useEffect(() => {
    if (!authLoading && user) {
      setIsClearing(true);
      const from = (location.state as any)?.from?.pathname || "/academy";
      setTimeout(() => navigate(from, { replace: true }), 1500);
    }
  }, [user, authLoading, navigate, location]);

  const handleAuth = async (isSignUp: boolean) => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (isSignUp && !fullName) {
      toast.error("Please enter your full name.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phone,
              country: country,
              city: city,
            }
          }
        });
        if (error) throw error;
        toast.success("Account created successfully! Check your email to verify your account or proceed to login.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Start "Security Clearance" transition
        setIsClearing(true);
        setTimeout(() => {
          navigate("/academy");
        }, 2200); // Mask the dashboard pre-fetch
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      if (!isClearing) setLoading(false);
    }
  };

  if (isClearing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-primary overflow-hidden relative">
        {/* Scanning grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-12">
          {/* Main Scanner Icon */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative size-24 rounded-full border-2 border-primary/50 flex items-center justify-center overflow-hidden">
               <ShieldCheck className="size-10 animate-show-hide" />
               <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 h-1/2 w-full animate-scan" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-mono text-lg uppercase tracking-[0.5em] font-bold animate-pulse">Personnel Identified</h2>
            <div className="flex flex-col gap-2 font-mono text-[9px] uppercase tracking-widest opacity-60">
               <div className="flex items-center justify-between gap-8 py-1 border-b border-white/10">
                  <span className="flex items-center gap-2"><Globe className="size-3" /> NETWORK</span>
                  <span className="text-secondary font-bold">STAR9_LOCAL_NODE</span>
               </div>
               <div className="flex items-center justify-between gap-8 py-1 border-b border-white/10">
                  <span className="flex items-center gap-2"><Database className="size-3" /> RECORDS</span>
                  <span className="text-secondary font-bold">SYCHRONIZING...</span>
               </div>
               <div className="flex items-center justify-between gap-8 py-1 border-b border-white/10">
                  <span className="flex items-center gap-2"><Cpu className="size-3" /> STATUS</span>
                  <span className="text-emerald-400 font-bold">CLEARANCE_GRNTD</span>
               </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
            <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_#3b82f6] animate-progress-fast" />
          </div>

          <p className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-40 animate-pulse">Initializing Virtual Learning Environment...</p>
        </div>

        <style>{`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          @keyframes progress-fast {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-scan { animation: scan 1.5s infinite linear; }
          .animate-progress-fast { animation: progress-fast 2.2s ease-in-out forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 relative overflow-hidden">
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono uppercase tracking-widest text-xs transition-colors z-20">
        <ArrowLeft className="w-4 h-4" /> Return to Star9
      </Link>

      {/* Dynamic background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none delay-1000" />
      
      <div className="w-full max-w-lg p-4 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8 gap-2">
          <span className="font-mono text-2xl tracking-widest uppercase font-semibold text-foreground">STAR9</span>
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground opacity-50">Personnel Onboarding Portal</span>
        </div>

        <Card className="glass border-border/50 shadow-2xl backdrop-blur-xl">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login" className="font-mono uppercase tracking-widest text-xs">Login</TabsTrigger>
                <TabsTrigger value="register" className="font-mono uppercase tracking-widest text-xs">Register</TabsTrigger>
              </TabsList>
            </CardHeader>

            {/* Login Tab */}
            <TabsContent value="login">
              <CardHeader className="pt-0">
                <CardTitle className="font-mono uppercase tracking-widest text-sm flex items-center gap-2">
                  <ShieldCheck className="size-4 text-primary" /> Access Portal
                </CardTitle>
                <CardDescription className="text-xs">Enter your credentials to access the Star9 ecosystem.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-widest ml-1">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="agent@star9.dev" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 focus:bg-background h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" title="password" className="text-[10px] uppercase tracking-widest ml-1">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 focus:bg-background h-11"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2 px-1">
                  <Checkbox 
                    id="persist" 
                    checked={persistSession} 
                    onCheckedChange={(checked) => setPersistSession(!!checked)}
                    className="border-primary/50 data-[state=checked]:bg-primary"
                  />
                  <label htmlFor="persist" className="text-[10px] uppercase tracking-widest text-muted-foreground cursor-pointer flex items-center gap-2">
                    <Fingerprint className="size-3 text-primary animate-pulse" /> Secure Session Persistence
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full font-mono uppercase tracking-widest h-12 gap-3" 
                  disabled={loading}
                  onClick={() => handleAuth(false)}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Identify Personnel
                </Button>
              </CardFooter>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader className="pt-0">
                <CardTitle className="font-mono uppercase tracking-widest text-sm flex items-center gap-2">
                  <Cpu className="size-4 text-primary" /> Initialize Unit
                </CardTitle>
                <CardDescription className="text-xs">Join the Star9 collective and elevate your workflow.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reg-email">Email Address</Label>
                    <Input 
                      id="reg-email" 
                      type="email" 
                      placeholder="agent@star9.dev" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50 focus:bg-background h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Security Pin (Password)</Label>
                    <Input 
                      id="reg-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50 focus:bg-background h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Personnel Name</Label>
                    <Input 
                      id="reg-name" 
                      type="text" 
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-background/50 focus:bg-background h-11"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="reg-phone">Operational City</Label>
                    <Input 
                      id="reg-city" 
                      type="text" 
                      placeholder="Nairobi" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-background/50 focus:bg-background h-11"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button 
                  className="w-full font-mono uppercase tracking-widest h-12 gap-3" 
                  disabled={loading}
                  onClick={() => handleAuth(true)}
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Register Asset
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
