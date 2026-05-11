import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import ReferralDashboard from "@/components/academy/ReferralDashboard";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";

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
            <Header />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Referrer Dashboard</h1>
                            <p className="text-muted-foreground">
                                Welcome back, {profile?.full_name}
                            </p>
                        </div>
                        <Button variant="outline" onClick={handleLogout} className="gap-2">
                            <LogOut className="size-4" />
                            Logout
                        </Button>
                    </div>

                    {/* Referral Dashboard Component */}
                    <ReferralDashboard user={user} profile={profile} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
