import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (isSignUp: boolean) => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Account created successfully! Check your email to verify your account or proceed to login.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Logged in successfully!");
        navigate("/academy");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 relative overflow-hidden">
      {/* Back to Home Button */}
      <Link to="/" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono uppercase tracking-widest text-xs transition-colors z-20">
        <ArrowLeft className="w-4 h-4" /> Return to Star9
      </Link>

      {/* Dynamic background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none delay-1000" />
      
      <div className="w-full max-w-md p-4 relative z-10">
        <a href="/" className="flex items-center justify-center mb-8">
          <span className="font-mono text-2xl tracking-widest uppercase font-semibold text-foreground">STAR9</span>
        </a>

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
                <CardTitle className="font-mono uppercase tracking-widest">Access Portal</CardTitle>
                <CardDescription>Enter your credentials to access the Star9 ecosystem.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="agent@star9.dev" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 focus:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 focus:bg-background"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full font-mono uppercase tracking-widest" 
                  disabled={loading}
                  onClick={() => handleAuth(false)}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Authenticate
                </Button>
              </CardFooter>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register">
              <CardHeader className="pt-0">
                <CardTitle className="font-mono uppercase tracking-widest">Initialize Account</CardTitle>
                <CardDescription>Join the Star9 collective and elevate your workflow.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input 
                    id="reg-email" 
                    type="email" 
                    placeholder="agent@star9.dev" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 focus:bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input 
                    id="reg-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 focus:bg-background"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full font-mono uppercase tracking-widest" 
                  disabled={loading}
                  onClick={() => handleAuth(true)}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Initialize
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
