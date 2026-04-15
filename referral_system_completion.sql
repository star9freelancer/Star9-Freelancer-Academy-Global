-- 1. Extend profiles with referral_code and attribution fields
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 2. Function to generate unique 8-char referral code
CREATE OR REPLACE FUNCTION generate_referral_code() RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  exists_code BOOLEAN;
BEGIN
  LOOP
    new_code := UPPER(SUBSTRING(REPLACE(gen_random_uuid()::TEXT, '-', ''), 1, 8));
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE referral_code = new_code) INTO exists_code;
    IF NOT exists_code THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 3. Update handle_new_user trigger to support referral attribution
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  ref_code TEXT;
  parent_id UUID;
BEGIN
  -- Generate new user's referral code
  new.referral_code := generate_referral_code();
  
  -- Extract parent referral code from metadata
  ref_code := new.raw_user_meta_data->>'referred_by_code';
  
  -- Find referrer ID
  IF ref_code IS NOT NULL AND ref_code != '' THEN
    SELECT id INTO parent_id FROM public.profiles WHERE referral_code = ref_code LIMIT 1;
    
    -- Attribution
    IF parent_id IS NOT NULL THEN
      -- Insert into profiles during handle_new_user
      INSERT INTO public.profiles (id, full_name, email, referral_code, referred_by_id)
      VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.referral_code, parent_id);
      
      -- Also log the relationship in referrals table
      INSERT INTO public.referrals (referrer_id, referee_id, status)
      VALUES (parent_id, new.id, 'pending')
      ON CONFLICT DO NOTHING;
      
      RETURN new;
    END IF;
  END IF;

  -- Default insert if no referral or invalid code
  INSERT INTO public.profiles (id, full_name, email, referral_code)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, new.referral_code);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;

-- 4. Retroactively generate codes for existing users
UPDATE public.profiles SET referral_code = generate_referral_code() WHERE referral_code IS NULL;
