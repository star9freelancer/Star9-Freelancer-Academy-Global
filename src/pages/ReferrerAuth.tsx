import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, ArrowLeft, Users } from "lucide-react";
import logo from "@/assets/Star9_Logo.png";

export default function ReferrerAuth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("login");
    const navigate = useNavigate();

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

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Check if user is a referrer
            const { data: referrerProfile, error: profileError } = await supabase
                .from("referrer_profiles")
                .select("*")
                .eq("id", data.user.id)
                .single();

            if (profileError || !referrerProfile) {
                await supabase.auth.signOut();
                toast.error("This account is not registered as a referrer.");
                return;
            }

            toast.success("Welcome back!");
            navigate("/referrer/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!email || !password || !fullName || !username || !phone) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            // Create auth user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        user_type: "referrer",
                        full_name: fullName,
                    },
                }
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error("User creation failed");

            // Generate referral code
            const { data: codeData, error: codeError } = await supabase
                .rpc("generate_referral_code", { username_input: username });

            if (codeError) throw codeError;

            const referralCode = codeData;

            // Create referrer profile (without payment details)
            const { error: profileError } = await supabase
                .from("referrer_profiles")
                .insert({
                    id: authData.user.id,
                    email: email,
                    full_name: fullName,
                    username: username,
                    phone_number: phone,
                    referral_code: referralCode,
                });

            if (profileError) throw profileError;

            // Create referrer record
            const { error: referrerError } = await supabase
                .from("referrers")
                .insert({
                    user_id: authData.user.id,
                    referral_code: referralCode,
                    username: username,
                });

            if (referrerError) throw referrerError;

            toast.success(`🎉 Welcome! Your referral code is: ${referralCode}`, {
                description: "Add payment details in settings to withdraw earnings.",
                duration: 8000,
            });

            // Auto login
            await supabase.auth.signInWithPassword({ email, password });
            navigate("/referrer/dashboard");
        } catch (error: any) {
            toast.error(error.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors z-20"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="absolute hidden md:block top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse pointer-events-none" />

            <div className="w-full max-w-lg p-4 relative z-10">
                <div className="flex flex-col items-center justify-center mb-8 gap-3">
                    <img src={logo} alt="Star9" className="h-20 md:h-24 w-auto object-contain" />
                    <div className="flex items-center gap-2 text-primary">
                        <Users className="size-5" />
                        <p className="text-sm font-semibold">Referrer Portal</p>
                    </div>
                </div>

                <Card className="border-border/50 shadow-xl">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <CardHeader>
                            <TabsList className="grid w-full grid-cols-2 mb-2">
                                <TabsTrigger value="login" className="text-sm">Log In</TabsTrigger>
                                <TabsTrigger value="register" className="text-sm">Sign Up</TabsTrigger>
                            </TabsList>
                        </CardHeader>

                        <TabsContent value="login">
                            <CardHeader className="space-y-4 pb-8">
                                <div className="space-y-1 text-center">
                                    <CardTitle className="text-3xl font-bold tracking-tighter">
                                        {isForgotPassword ? "Reset Password" : "Referrer Login"}
                                    </CardTitle>
                                    <CardDescription>
                                        {isForgotPassword
                                            ? "Enter your email to receive a reset link."
                                            : "Access your referral dashboard and earnings"
                                        }
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (isForgotPassword ? handleForgotPassword() : handleLogin())}
                                        className="h-11"
                                    />
                                </div>
                                {!isForgotPassword && (
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                            className="h-11"
                                        />
                                    </div>
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
                            <CardFooter className="flex flex-col gap-3">
                                <Button
                                    className="w-full h-12"
                                    disabled={loading}
                                    onClick={isForgotPassword ? handleForgotPassword : handleLogin}
                                >
                                    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                    {isForgotPassword ? "Send Reset Link" : "Log In"}
                                </Button>
                                {!isForgotPassword && (
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPassword(true)}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Forgot your password?
                                    </button>
                                )}
                            </CardFooter>
                        </TabsContent>

                        <TabsContent value="register">
                            <CardHeader className="space-y-4 pb-8">
                                <div className="space-y-1 text-center">
                                    <CardTitle className="text-3xl font-bold tracking-tighter">
                                        Become a Referrer
                                    </CardTitle>
                                    <CardDescription>
                                        Join our referral program and start earning
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name *</Label>
                                        <Input
                                            id="fullName"
                                            placeholder="John Doe"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="username">Username *</Label>
                                        <Input
                                            id="username"
                                            placeholder="johndoe"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="h-11"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Used to generate your referral code
                                        </p>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="reg-email">Email *</Label>
                                        <Input
                                            id="reg-email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reg-password">Password *</Label>
                                        <Input
                                            id="reg-password"
                                            type="password"
                                            placeholder="Create password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+254 712 345 678"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 mt-4">
                                    <p className="text-sm text-muted-foreground text-center">
                                        Already have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab("login")}
                                            className="text-primary font-semibold hover:underline"
                                        >
                                            Sign in here
                                        </button>
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full h-12"
                                    disabled={loading}
                                    onClick={handleSignup}
                                >
                                    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                    Create Referrer Account
                                </Button>
                            </CardFooter>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}
