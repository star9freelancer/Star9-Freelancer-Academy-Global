import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ReferralDashboard from "@/components/academy/ReferralDashboard";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import logo from "@/assets/logo_highres_transparent.png";

export default function ReferrerDashboard() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

            if (authError || !authUser) {
                navigate("/referrer/auth");
                return;
            }

            // Check if user is a referrer
            const { data: referrerProfile, error: profileError } = await supabase
                .from("referrer_profiles")
                .select("*")
                .eq("id", authUser.id)
                .single();

            if (profileError || !referrerProfile) {
                toast.error("Access denied. This portal is for referrers only.");
                await supabase.auth.signOut();
                navigate("/referrer/auth");
                return;
            }

            setUser(authUser);
            setProfile(referrerProfile);
        } catch (error) {
            console.error("Auth check error:", error);
            navigate("/referrer/auth");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/referrer/auth");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Custom Header with Logout */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-5">
                <nav className="flex items-center justify-between gap-2 md:gap-3 px-6 py-1.5 w-full max-w-7xl transition-all duration-300 bg-white rounded-full shadow-lg border border-gray-100">
                    {/* Logo */}
                    <Link to="/" className="p-1 rounded-full hover:opacity-80 transition-opacity shrink-0">
                        <img src={logo} alt="Star9 Freelancer" className="h-16 sm:h-20 w-auto object-contain" />
                    </Link>

                    <div className="h-6 w-px bg-gray-200 mx-2 shrink-0 hidden md:block" />

                    {/* Title - Hidden on mobile */}
                    <div className="hidden md:block flex-1">
                        <h1 className="text-lg font-bold text-primary">Referrer Dashboard</h1>
                    </div>

                    {/* Logout Button */}
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="gap-2 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                        size="sm"
                    >
                        <LogOut className="size-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </nav>
            </header>

            <main className="pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Message */}
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {profile?.full_name}</h2>
                        <p className="text-muted-foreground mt-1">Manage your referrals and track your earnings</p>
                    </div>

                    {/* Referral Dashboard Component */}
                    <ReferralDashboard user={user} profile={profile} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
