import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

// Edge Function to process Paystack Webhooks in USD
// Validates payment success, triggers course enrollment, and calculates referrer commissions.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req: Request) => {
  // Only accept POST requests from Paystack webhooks
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const payload = await req.json();

    // In a prod environment, verify req.headers.get('x-paystack-signature') here
    // using HMAC SHA512 with your SECRET_KEY.

    // Listen only for successful charges
    if (payload.event === 'charge.success') {
      const data = payload.data;
      
      // Ensure currency is USD 
      if (data.currency !== 'USD') {
        console.warn('Non-USD transaction captured in webhook.');
        return new Response(JSON.stringify({ message: "Currency not processed via this webhook." }), { status: 200 });
      }

      // Extract custom metadata passed from React Academy.tsx
      const custom_fields = data.metadata?.custom_fields || [];
      const userField = custom_fields.find((f: any) => f.variable_name === 'user_id');
      const courseField = custom_fields.find((f: any) => f.variable_name === 'course_id');
      
      const userId = userField?.value;
      const courseId = courseField?.value;

      if (!userId || !courseId) {
        throw new Error('Missing user_id or course_id in metadata');
      }

      // 1. Process Course Enrollment
      const { error: enrollError } = await supabase
        .from('user_enrollments')
        .insert({ user_id: userId, course_id: courseId, progress: 0 })
        .select()
        .single();

      if (enrollError && enrollError.code !== '23505') { // Ignore already-enrolled constraints
        throw new Error(`Enrollment failed: ${enrollError.message}`);
      }

      // Add to general community group
      const { data: generalGroup } = await supabase.from('chat_groups').select('id').eq('type', 'general').single();
      if (generalGroup) {
        await supabase.from('chat_members').upsert({ group_id: generalGroup.id, user_id: userId }, { onConflict: 'group_id,user_id' });
      }

      // Determine Pricing for referral payouts & role upgrades
      // Hardcoded mapping representing our 3 tiers. In production, querying the DB is preferred.
      const amountPaidUsd = data.amount / 100; // Paystack amount is in cents
      let commissionAmount = 0;
      let upgradeToFreelancer = false;

      // $100 -> AI Freelancers ($10 comm), $250 -> Mastering ($40 comm + unlock), $300 -> Teacher ($40 comm)
      if (amountPaidUsd >= 250 && amountPaidUsd < 300) {
         commissionAmount = 40.00;
         upgradeToFreelancer = true;
      } else if (amountPaidUsd >= 300) {
         commissionAmount = 40.00; 
      } else if (amountPaidUsd >= 100) {
         commissionAmount = 10.00;
      }

      // 2. Bonus: Unlock Global Board (Freemium capability)
      if (upgradeToFreelancer) {
         await supabase.from('profiles').update({ role: 'freelancer' }).eq('id', userId);
      }

      // 3. Referral Commission Engine
      // Check if user was referred by someone
      const { data: profileObj } = await supabase.from('profiles').select('referred_by_id').eq('id', userId).single();
      
      if (profileObj && profileObj.referred_by_id && commissionAmount > 0) {
         // Log the payout internally
         await supabase.from('commissions').insert({
            referrer_id: profileObj.referred_by_id,
            course_id: courseId,
            amount_usd: commissionAmount,
            status: 'pending' // pending until next payout cycle
         });
      }

      return new Response(JSON.stringify({ status: 200, message: "Webhook processed successfully" }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });

    }

    // Return 200 OK for other events so Paystack doesn't retry endlessly
    return new Response(JSON.stringify({ message: "Event ignored" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
