import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ReferralDashboard from "@/components/academy/ReferralDashboard";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

const Referrals = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();

    const handleGetStarted = () => {
        if (!user) {
            navigate("/referrer/auth?tab=register");
        }
    };

    // If user is logged in, show the full referral dashboard
    if (user) {
        return (
            <div className="min-h-screen bg-background">
                <Header />

                <main className="pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <ReferralDashboard user={user} profile={profile} />
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // If not logged in, show the landing page
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                        <Users className="size-10 text-primary" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Earn with Star9 Referrals
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Share Star9 Academy with your network and earn rewards for every successful referral.
                        Help others discover quality education while building your income.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 pt-8">
                        <div className="p-6 rounded-2xl border border-border bg-card">
                            <div className="text-3xl font-bold text-primary mb-2">1</div>
                            <h3 className="font-semibold mb-2">Share Your Link</h3>
                            <p className="text-sm text-muted-foreground">
                                Get your unique referral link and share it with friends, family, and your network.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border bg-card">
                            <div className="text-3xl font-bold text-primary mb-2">2</div>
                            <h3 className="font-semibold mb-2">They Enroll</h3>
                            <p className="text-sm text-muted-foreground">
                                When someone signs up using your link and enrolls in a course, you earn rewards.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-border bg-card">
                            <div className="text-3xl font-bold text-primary mb-2">3</div>
                            <h3 className="font-semibold mb-2">Get Paid</h3>
                            <p className="text-sm text-muted-foreground">
                                Track your earnings and withdraw your rewards directly to your account.
                            </p>
                        </div>
                    </div>

                    <div className="pt-8">
                        <Button
                            size="lg"
                            onClick={handleGetStarted}
                            className="gap-2"
                        >
                            Get Started
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Referrals;
