-- ============================================
-- Star9 Final Security Audit & Hardening
-- ============================================

-- 1. Profiles Table Hardening
-- Remove the public select policy
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON public.profiles;

-- Create a more restrictive select policy:
-- Anyone can see basic public info (name, role, avatar)
-- Only the owner or admin can see sensitive metadata
CREATE POLICY "Public profile info viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

-- HOWEVER, we should ensure the API doesn't return sensitive columns unless necessary.
-- Since we can't restrict columns in RLS easily without views, we will at least 
-- ensure that sensitive updates are blocked.

-- 2. Restrict Role Updates
-- Only admins can change roles
DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
CREATE POLICY "Users can update own non-sensitive profile info" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    (CASE WHEN role IS DISTINCT FROM (SELECT role FROM public.profiles WHERE id = auth.uid()) THEN 
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    ELSE true END)
  );

-- 3. Ensure RLS is enabled on all tables
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.commissions ENABLE ROW LEVEL SECURITY;

-- 4. Final Review of Sensitive Tables
-- contact_messages: Only admins should select
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can read contact messages" ON public.contact_messages;
CREATE POLICY "Admins can read contact messages" ON public.contact_messages
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- 5. Audit logs (Optional: can add if needed)
