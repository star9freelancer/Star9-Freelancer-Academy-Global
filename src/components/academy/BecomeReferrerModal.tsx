import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerAsReferrer } from "@/lib/referrals";
import { toast } from "sonner";
import { Loader2, CreditCard, Smartphone } from "lucide-react";

interface BecomeReferrerModalProps {
    open: boolean;
    onClose: () => void;
    userId: string;
    userFullName?: string;
    onSuccess: (data: any) => void;
}

export function BecomeReferrerModal({ open, onClose, userId, userFullName, onSuccess }: BecomeReferrerModalProps) {
    const [username, setUsername] = useState(userFullName || "");
    const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "mobile_money">("bank_transfer");
    const [bankDetails, setBankDetails] = useState({
        account_name: "",
        account_number: "",
        bank_name: "",
    });
    const [mobileDetails, setMobileDetails] = useState({
        number: "",
        provider: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim()) {
            toast.error("Please enter a username");
            return;
        }

        if (paymentMethod === "bank_transfer") {
            if (!bankDetails.account_name || !bankDetails.account_number || !bankDetails.bank_name) {
                toast.error("Please fill in all bank details");
                return;
            }
        } else {
            if (!mobileDetails.number || !mobileDetails.provider) {
                toast.error("Please fill in all mobile money details");
                return;
            }
        }

        setLoading(true);

        const paymentDetails = {
            payment_method: paymentMethod,
            ...(paymentMethod === "bank_transfer" ? {
                bank_account_name: bankDetails.account_name,
                bank_account_number: bankDetails.account_number,
                bank_name: bankDetails.bank_name,
            } : {
                mobile_money_number: mobileDetails.number,
                mobile_money_provider: mobileDetails.provider,
            })
        };

        const result = await registerAsReferrer(userId, username, paymentDetails);

        if (result.success) {
            toast.success(`🎉 Welcome to the Referral Program!`, {
                description: `Your referral code is: ${result.referralCode}`,
                duration: 8000,
            });
            onSuccess(result.data);
            onClose();
        } else {
            toast.error(result.error || "Failed to register as referrer");
        }

        setLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Become a Referrer</DialogTitle>
                    <DialogDescription>
                        Join our referral program and earn commissions by sharing Star9 Academy with your network.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username *</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Your username"
                            required
                            maxLength={20}
                        />
                        <p className="text-xs text-muted-foreground">
                            Used to generate your unique referral code (e.g., JOHN1234)
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Label>Payment Method *</Label>
                        <RadioGroup value={paymentMethod} onValueChange={(v: any) => setPaymentMethod(v)}>
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="bank_transfer" id="bank" />
                                <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <CreditCard className="size-4 text-primary" />
                                    <span>Bank Transfer</span>
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer">
                                <RadioGroupItem value="mobile_money" id="mobile" />
                                <Label htmlFor="mobile" className="flex items-center gap-2 cursor-pointer flex-1">
                                    <Smartphone className="size-4 text-primary" />
                                    <span>Mobile Money</span>
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {paymentMethod === "bank_transfer" ? (
                        <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
                            <h4 className="font-semibold text-sm">Bank Account Details</h4>
                            <div className="space-y-2">
                                <Label htmlFor="account_name">Account Name *</Label>
                                <Input
                                    id="account_name"
                                    placeholder="John Doe"
                                    value={bankDetails.account_name}
                                    onChange={(e) => setBankDetails({ ...bankDetails, account_name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="account_number">Account Number *</Label>
                                <Input
                                    id="account_number"
                                    placeholder="1234567890"
                                    value={bankDetails.account_number}
                                    onChange={(e) => setBankDetails({ ...bankDetails, account_number: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bank_name">Bank Name *</Label>
                                <Input
                                    id="bank_name"
                                    placeholder="Equity Bank"
                                    value={bankDetails.bank_name}
                                    onChange={(e) => setBankDetails({ ...bankDetails, bank_name: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 p-4 rounded-lg bg-muted/50 border border-border">
                            <h4 className="font-semibold text-sm">Mobile Money Details</h4>
                            <div className="space-y-2">
                                <Label htmlFor="mobile_number">Mobile Money Number *</Label>
                                <Input
                                    id="mobile_number"
                                    placeholder="+254 712 345 678"
                                    value={mobileDetails.number}
                                    onChange={(e) => setMobileDetails({ ...mobileDetails, number: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="provider">Provider *</Label>
                                <Input
                                    id="provider"
                                    placeholder="M-Pesa, Airtel Money, MTN"
                                    value={mobileDetails.provider}
                                    onChange={(e) => setMobileDetails({ ...mobileDetails, provider: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">Note:</strong> You'll receive your unique referral code after registration.
                            Share it with your network to start earning commissions!
                        </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1" disabled={loading}>
                            {loading && <Loader2 className="size-4 animate-spin mr-2" />}
                            {loading ? "Registering..." : "Become a Referrer"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
