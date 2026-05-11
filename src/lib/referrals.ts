import { supabase } from "./supabase";

export interface ReferrerData {
    id: string;
    user_id: string;
    referral_code: string;
    username: string;
    total_referrals: number;
    total_earnings: number;
    available_balance: number;
    total_withdrawn: number;
    payment_method: string;
    status: string;
}

export interface ReferralData {
    id: string;
    referrer_id: string;
    referred_email: string;
    referred_name: string | null;
    course_name: string | null;
    commission_amount: number | null;
    status: string;
    created_at: string;
}

/**
 * Track a referral when a new user signs up with a referral code
 */
export async function trackReferral(
    referralCode: string,
    referredUserId: string,
    referredEmail: string,
    referredName?: string
) {
    try {
        // Validate referral code exists and is active
        const { data: referrer, error: referrerError } = await supabase
            .from("referrers")
            .select("id")
            .eq("referral_code", referralCode.toUpperCase())
            .eq("status", "active")
            .single();

        if (referrerError || !referrer) {
            console.error("Invalid referral code:", referralCode);
            return { success: false, error: "Invalid referral code" };
        }

        // Create referral record with pending status
        const { error: referralError } = await supabase
            .from("referrals")
            .insert({
                referrer_id: referrer.id,
                referred_user_id: referredUserId,
                referred_email: referredEmail,
                referred_name: referredName,
                referral_code_used: referralCode.toUpperCase(),
                status: "pending",
            });

        if (referralError) {
            console.error("Error tracking referral:", referralError);
            return { success: false, error: referralError.message };
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error in trackReferral:", error);
        return { success: false, error: "Failed to track referral" };
    }
}

/**
 * Confirm referral commission after successful course enrollment and payment
 */
export async function confirmReferralCommission(
    referredUserId: string,
    courseId: string,
    courseName: string,
    coursePrice: number
) {
    try {
        // Get commission rate for this course
        const { data: commissionRate } = await supabase
            .from("commission_rates")
            .select("commission_percentage, fixed_commission")
            .eq("course_name", courseName)
            .maybeSingle();

        // Calculate commission amount
        const commissionAmount = commissionRate?.fixed_commission ||
            (coursePrice * (commissionRate?.commission_percentage || 10)) / 100;

        // Update referral with course and commission info, change status to confirmed
        const { error } = await supabase
            .from("referrals")
            .update({
                course_id: courseId,
                course_name: courseName,
                course_price: coursePrice,
                commission_rate: commissionRate?.commission_percentage || 10,
                commission_amount: commissionAmount,
                status: "confirmed",
                enrollment_date: new Date().toISOString(),
                payment_confirmed_date: new Date().toISOString(),
            })
            .eq("referred_user_id", referredUserId)
            .eq("status", "pending");

        if (error) {
            console.error("Error confirming commission:", error);
            return { success: false, error: error.message };
        }

        return { success: true, commissionAmount };
    } catch (error: any) {
        console.error("Error in confirmReferralCommission:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Register a user as a referrer
 */
export async function registerAsReferrer(
    userId: string,
    username: string,
    paymentDetails: {
        payment_method: "bank_transfer" | "mobile_money";
        bank_account_name?: string;
        bank_account_number?: string;
        bank_name?: string;
        mobile_money_number?: string;
        mobile_money_provider?: string;
    }
) {
    try {
        // Check if user is already a referrer
        const { data: existing } = await supabase
            .from("referrers")
            .select("id")
            .eq("user_id", userId)
            .maybeSingle();

        if (existing) {
            return { success: false, error: "You are already registered as a referrer" };
        }

        // Generate referral code using database function
        const { data: codeData, error: codeError } = await supabase
            .rpc("generate_referral_code", { username_input: username });

        if (codeError) {
            console.error("Error generating code:", codeError);
            throw codeError;
        }

        const referralCode = codeData;

        // Create referrer record
        const { data, error } = await supabase
            .from("referrers")
            .insert({
                user_id: userId,
                referral_code: referralCode,
                username: username,
                ...paymentDetails,
                status: "active",
            })
            .select()
            .single();

        if (error) throw error;

        return { success: true, data, referralCode };
    } catch (error: any) {
        console.error("Error registering referrer:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Get referrer dashboard data
 */
export async function getReferrerDashboard(userId: string) {
    try {
        // Get referrer info
        const { data: referrer, error: referrerError } = await supabase
            .from("referrers")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (referrerError) {
            return { success: false, error: "Not registered as referrer", isReferrer: false };
        }

        // Get referrals
        const { data: referrals, error: referralsError } = await supabase
            .from("referrals")
            .select("*")
            .eq("referrer_id", referrer.id)
            .order("created_at", { ascending: false });

        if (referralsError) throw referralsError;

        // Get pending withdrawals
        const { data: withdrawals, error: withdrawalsError } = await supabase
            .from("withdrawal_requests")
            .select("*")
            .eq("referrer_id", referrer.id)
            .order("requested_at", { ascending: false });

        if (withdrawalsError) throw withdrawalsError;

        return {
            success: true,
            isReferrer: true,
            referrer,
            referrals: referrals || [],
            withdrawals: withdrawals || [],
        };
    } catch (error: any) {
        console.error("Error fetching dashboard:", error);
        return { success: false, error: error.message, isReferrer: false };
    }
}

/**
 * Request a withdrawal
 */
export async function requestWithdrawal(
    referrerId: string,
    amount: number
) {
    try {
        // Check available balance
        const { data: referrer, error: referrerError } = await supabase
            .from("referrers")
            .select("available_balance, payment_method, bank_account_name, bank_account_number, bank_name, mobile_money_number, mobile_money_provider")
            .eq("id", referrerId)
            .single();

        if (referrerError) throw referrerError;

        if (!referrer || referrer.available_balance < amount) {
            return { success: false, error: "Insufficient balance" };
        }

        if (amount < 10) {
            return { success: false, error: "Minimum withdrawal amount is $10" };
        }

        // Prepare account details
        const accountDetails = referrer.payment_method === "bank_transfer"
            ? {
                account_name: referrer.bank_account_name,
                account_number: referrer.bank_account_number,
                bank_name: referrer.bank_name,
            }
            : {
                mobile_number: referrer.mobile_money_number,
                provider: referrer.mobile_money_provider,
            };

        // Create withdrawal request
        const { error } = await supabase
            .from("withdrawal_requests")
            .insert({
                referrer_id: referrerId,
                amount: amount,
                payment_method: referrer.payment_method,
                account_details: accountDetails,
                status: "pending",
            });

        if (error) throw error;

        return { success: true };
    } catch (error: any) {
        console.error("Error requesting withdrawal:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Validate a referral code
 */
export async function validateReferralCode(code: string) {
    try {
        const { data, error } = await supabase
            .from("referrers")
            .select("id, username, referral_code")
            .eq("referral_code", code.toUpperCase())
            .eq("status", "active")
            .maybeSingle();

        if (error) throw error;

        return {
            valid: !!data,
            referrer: data,
        };
    } catch (error) {
        console.error("Error validating code:", error);
        return { valid: false, referrer: null };
    }
}
