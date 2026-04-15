-- 1. Add Onboarding Status and Role-Specific Columns to Profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS job_title TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS institution TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS degree TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS graduation_year TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS experience_years INTEGER;

-- 2. Ensure existing users have onboarding_completed = TRUE if they already have data
-- (Safety measure for legacy users)
UPDATE public.profiles 
SET onboarding_completed = TRUE 
WHERE full_name IS NOT NULL AND city IS NOT NULL AND onboarding_completed = FALSE;

-- 3. Update the handle_new_user function to respect the user's role choice from metadata
-- This ensures that the 'role' column in public.profiles is correctly synced from auth.users metadata during signup.
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  ref_code TEXT;
  parent_id UUID;
  user_role TEXT;
  new_referral_code TEXT;
BEGIN
  -- Generate new user's referral code into local variable
  new_referral_code := generate_referral_code();
  
  -- Extract parent referral code and role from metadata
  ref_code := new.raw_user_meta_data->>'referred_by_code';
  user_role := COALESCE(new.raw_user_meta_data->>'role', 'student'); -- Default to student if not provided
  
  -- Find referrer ID
  IF ref_code IS NOT NULL AND ref_code != '' THEN
    SELECT id INTO parent_id FROM public.profiles WHERE referral_code = ref_code LIMIT 1;
    
      -- Attribution
      IF parent_id IS NOT NULL THEN
        INSERT INTO public.profiles (id, full_name, email, role, referral_code, referred_by_id)
        VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, user_role, new_referral_code, parent_id);
        
        INSERT INTO public.referrals (referrer_id, referee_id, status)
      VALUES (parent_id, new.id, 'pending')
      ON CONFLICT DO NOTHING;
      
      RETURN new;
    END IF;
  END IF;

  -- Default insert
  INSERT INTO public.profiles (id, full_name, email, role, referral_code)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, user_role, new_referral_code);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;
