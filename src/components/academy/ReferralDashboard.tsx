import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Copy as CopyIcon,
  Check as CheckIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon,
  TrendingUp as TrendingUpIcon,
  Link as LinkIcon,
  Share2 as Share2Icon,
  ArrowRight as ArrowRightIcon,
  Clock as ClockIcon,
  Download as DownloadIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getReferrerDashboard, requestWithdrawal } from "@/lib/referrals";
import { BecomeReferrerModal } from "./BecomeReferrerModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReferralStats {
  total_referrals: number;
  pending_earnings: number;
  paid_earnings: number;
  referrals: {
    id: string;
    referred_email: string;
    course_name: string;
    commission: number;
    status: "pending" | "confirmed" | "paid";
    created_at: string;
  }[];
}

const COMMISSION_MAP: Record<string, number> = {
  "AI for Freelancers": 10,
  "Mastering Freelancing": 15,
  "International Teacher Preparation": 15,
};

interface ReferralDashboardProps {
  user: any;
  profile: any;
}

const ReferralDashboard = ({ user, profile }: ReferralDashboardProps) => {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<ReferralStats>({
    total_referrals: 0,
    pending_earnings: 0,
    paid_earnings: 0,
    referrals: [],
  });
  const [loading, setLoading] = useState(true);
  const [isReferrer, setIsReferrer] = useState(false);
  const [referrerInfo, setReferrerInfo] = useState<any>(null);
  const [showBecomeReferrer, setShowBecomeReferrer] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);

  const referralCode = profile?.referral_code || referrerInfo?.referral_code || "XXXXXXXX";
  const referralLink = `${window.location.origin}/auth?tab=register&ref=${referralCode}`;

  useEffect(() => {
    if (!user?.id) return;

    // If we have profile with referral_code, we know they're a referrer
    if (profile?.referral_code) {
      setIsReferrer(true);
      setReferrerInfo(profile);
    }

    fetchStats();
  }, [user?.id, profile]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      // First check if user has referral_code in profile (simpler check)
      if (profile?.referral_code) {
        setIsReferrer(true);
        setReferrerInfo(profile);

        // Try to fetch additional stats from referrers table
        try {
          const result = await getReferrerDashboard(user.id);

          if (result.success && result.isReferrer) {
            setReferrerInfo(result.referrer);
            setStats({
              total_referrals: result.referrer.total_referrals || 0,
              pending_earnings: result.referrer.available_balance || 0,
              paid_earnings: result.referrer.total_withdrawn || 0,
              referrals: result.referrals.map((r: any) => ({
                id: r.id,
                referred_email: r.referred_email,
                course_name: r.course_name || "Pending enrollment",
                commission: r.commission_amount || 0,
                status: r.status,
                created_at: r.created_at,
              })),
            });
          }
        } catch (err) {
          console.warn("Could not fetch detailed stats, using defaults:", err);
          // Use default stats if tables don't exist yet
          setStats({
            total_referrals: 0,
            pending_earnings: 0,
            paid_earnings: 0,
            referrals: [],
          });
        }
      } else {
        setIsReferrer(false);
      }
    } catch (error: any) {
      console.error("Error fetching stats:", error);
      // Don't show error toast if it's just missing tables
      if (!error.message?.includes("relation") && !error.message?.includes("does not exist")) {
        toast.error("Failed to load referral data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    const amount = parseFloat(withdrawalAmount);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (amount < 10) {
      toast.error("Minimum withdrawal amount is $10");
      return;
    }

    if (amount > (referrerInfo?.available_balance || 0)) {
      toast.error("Insufficient balance");
      return;
    }

    setWithdrawing(true);

    try {
      const result = await requestWithdrawal(referrerInfo.id, amount);

      if (result.success) {
        toast.success("Withdrawal request submitted!", {
          description: "Your request will be processed within 2-3 business days.",
        });
        setShowWithdrawal(false);
        setWithdrawalAmount("");
        fetchStats();
      } else {
        toast.error(result.error || "Failed to request withdrawal");
      }
    } catch (error: any) {
      console.error("Withdrawal error:", error);
      toast.error("Withdrawal system not available yet. Please contact support.");
    } finally {
      setWithdrawing(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!", { description: "Share it with your network to start earning." });
    setTimeout(() => setCopied(false), 2500);
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Star9 Academy",
        text: "I use Star9 to build a global freelance career. Join using my link!",
        url: referralLink,
      }).catch(() => { });
    } else {
      copyLink();
    }
  };

  const statCards = [
    {
      label: "Total Referrals",
      value: stats.total_referrals,
      icon: UsersIcon,
      color: "text-primary",
      bg: "bg-primary/10",
      suffix: "",
    },
    {
      label: "Pending Earnings",
      value: stats.pending_earnings,
      icon: ClockIcon,
      color: "text-secondary",
      bg: "bg-secondary/10",
      prefix: "$",
    },
    {
      label: "Total Paid Out",
      value: stats.paid_earnings,
      icon: DollarSignIcon,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      prefix: "$",
    },
    {
      label: "Total Earned",
      value: stats.pending_earnings + stats.paid_earnings,
      icon: TrendingUpIcon,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      prefix: "$",
    },
  ];

  const commissionGuide = [
    { course: "AI for Freelancers", price: "$50", commission: "$10", color: "bg-primary/5 border-primary/20 text-primary" },
    { course: "Mastering Freelancing", price: "$100", commission: "$15", color: "bg-secondary/5 border-secondary/20 text-secondary" },
    { course: "International Teacher Preparation", price: "$300", commission: "$15", color: "bg-emerald-500/5 border-emerald-500/20 text-emerald-500" },
  ];

  const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/5 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
    confirmed: "bg-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20",
    paid: "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      {!user ? (
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            Partner Programme
          </div>
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter">
            Become a <span className="text-primary italic">Star9</span> Partner
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Join our global network of referrers and earn competitive commissions while helping others build their freelance careers.
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-2xl px-10 h-14 bg-primary text-white font-bold tracking-tight hover:bg-primary/90" asChild>
              <Link to="/auth">Join as Partner <ArrowRightIcon className="size-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">Referral Programme</h2>
          <p className="text-muted-foreground">
            Earn commissions by sharing Star9 with your network. Payments are processed after each confirmed enrolment.
          </p>
        </div>
      )}

      {/* Your Referral Link (Logged In Referrers Only) */}
      {user && isReferrer && (
        <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 space-y-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="size-5 text-primary" />
            <h3 className="font-semibold text-foreground">Your Referral Link</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 px-4 py-3 rounded-xl bg-background border border-border font-mono text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
              {referralLink}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2 shrink-0"
                onClick={copyLink}
              >
                {copied ? <CheckIcon className="size-4 text-emerald-400" /> : <CopyIcon className="size-4" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button className="gap-2 shrink-0" onClick={shareLink}>
                <Share2Icon className="size-4" /> Share
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Your referral code: <span className="font-mono font-semibold text-primary">{referralCode}</span>.
            Commissions are confirmed after the referred student completes payment.
          </p>
        </div>
      )}

      {/* Stat Cards (Logged In Referrers Only) */}
      {user && isReferrer && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statCards.map((s, i) => (
              <div
                key={s.label}
                className="p-5 rounded-2xl border border-border bg-card space-y-3"
              >
                <div className={`size-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                  <s.icon className={`size-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {s.prefix ?? ""}{loading ? "--" : s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Withdrawal Button */}
          {(referrerInfo?.available_balance || 0) >= 10 && (
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => setShowWithdrawal(true)}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8"
              >
                <DownloadIcon className="size-4" />
                Withdraw ${referrerInfo?.available_balance?.toFixed(2)}
              </Button>
            </div>
          )}
        </>
      )}

      {/* Commission Guide */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Commission Rates</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {commissionGuide.map((c, i) => (
            <div key={i} className={`p-4 rounded-xl border ${c.color} space-y-2`}>
              <p className="text-sm font-semibold text-foreground">{c.course}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Course price</span>
                <span className="text-sm font-bold text-foreground">{c.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Your commission</span>
                <span className={`text-sm font-bold`}>{c.commission}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral History (Logged In Referrers Only) */}
      {user && isReferrer && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Referral History</h3>
            <Button variant="ghost" size="sm" onClick={fetchStats}>Refresh</Button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
          ) : stats.referrals.length === 0 ? (
            <div className="text-center py-16 rounded-2xl border border-border bg-card/40 space-y-4">
              <div className="size-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <UsersIcon className="size-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">No referrals yet</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
                  Share your referral link with friends and earn $10-$15 per successful enrolment.
                </p>
              </div>
              <Button className="gap-2" onClick={copyLink}>
                <CopyIcon className="size-4" /> Copy Your Link
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-4 gap-4 px-5 py-3 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Referred</span>
                <span>Course</span>
                <span>Commission</span>
                <span>Status</span>
              </div>
              <div className="divide-y divide-border">
                {stats.referrals.map((r, i) => (
                  <div key={r.id} className="grid grid-cols-4 gap-4 px-5 py-4 items-center hover:bg-muted/20 transition-colors">
                    <span className="text-sm text-foreground font-medium truncate">{r.referred_email}</span>
                    <span className="text-sm text-muted-foreground truncate">{r.course_name}</span>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">${r.commission}</span>
                    <Badge className={`text-xs border w-fit ${statusColor[r.status]}`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* How it works */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-5">
        <h3 className="font-semibold text-foreground">How it works</h3>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { step: "1", title: "Share your link", desc: "Copy your unique referral link and share it via WhatsApp, social media, or email." },
            { step: "2", title: "They enrol", desc: "When someone signs up using your link and completes payment for any course, you earn." },
            { step: "3", title: "You get paid", desc: "Commissions are confirmed within 48 hours of enrolment and paid to your registered account." },
          ].map(s => (
            <div key={s.step} className="flex gap-4 items-start">
              <div className="size-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">{s.step}</div>
              <div>
                <p className="font-semibold text-sm text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Become Referrer Modal */}
      {user && (
        <BecomeReferrerModal
          open={showBecomeReferrer}
          onClose={() => setShowBecomeReferrer(false)}
          userId={user.id}
          userFullName={profile?.full_name}
          onSuccess={(data) => {
            setReferrerInfo(data);
            setIsReferrer(true);
            fetchStats();
          }}
        />
      )}

      {/* Withdrawal Modal */}
      <Dialog open={showWithdrawal} onOpenChange={setShowWithdrawal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
            <DialogDescription>
              Enter the amount you want to withdraw. Minimum withdrawal is $10.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-muted-foreground">Available Balance</span>
                <span className="text-lg font-bold text-primary">
                  ${referrerInfo?.available_balance?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="10"
                step="0.01"
                placeholder="Enter amount"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
              />
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Payment Method:</strong>{" "}
                {referrerInfo?.payment_method === "bank_transfer" ? "Bank Transfer" : "Mobile Money"}
              </p>
              {referrerInfo?.payment_method === "bank_transfer" ? (
                <p className="text-xs text-muted-foreground mt-1">
                  {referrerInfo?.bank_name} - {referrerInfo?.bank_account_number}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  {referrerInfo?.mobile_money_provider} - {referrerInfo?.mobile_money_number}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowWithdrawal(false)}
                className="flex-1"
                disabled={withdrawing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleWithdrawal}
                className="flex-1"
                disabled={withdrawing}
              >
                {withdrawing ? "Processing..." : "Request Withdrawal"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ReferralDashboard;
