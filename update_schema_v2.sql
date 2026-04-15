-- 1. Updates `profiles` table role constraints
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('admin', 'student', 'freelancer', 'employer', 'referrer'));

-- Add a column to track who referred the user (optional, but good for joins)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS referred_by_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- 2. Referrals Table
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  referee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(referrer_id, referee_id)
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Referrers can view their referrals" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Admins manage referrals" ON referrals
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 3. Commissions Table
CREATE TABLE IF NOT EXISTS commissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  referral_id UUID REFERENCES referrals(id) ON DELETE CASCADE,
  referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES academy_courses(id) ON DELETE CASCADE,
  amount_usd NUMERIC NOT NULL,
  status TEXT CHECK (status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Referrers can view their commissions" ON commissions
  FOR SELECT USING (auth.uid() = referrer_id);
CREATE POLICY "Admins manage commissions" ON commissions
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- 4. Project Contracts & Fees Table
CREATE TABLE IF NOT EXISTS project_contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  freelancer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  employer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  project_title TEXT NOT NULL,
  duration_months INTEGER DEFAULT 1,
  gross_pay_usd NUMERIC NOT NULL DEFAULT 0,
  fee_charged_usd NUMERIC GENERATED ALWAYS AS (
    CASE
      WHEN duration_months > 6 AND gross_pay_usd >= 10000 THEN 1000.00
      ELSE (gross_pay_usd * 0.05)
    END
  ) STORED,
  status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE project_contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers view own projects" ON project_contracts
  FOR SELECT USING (auth.uid() = freelancer_id);
CREATE POLICY "Employers view own projects" ON project_contracts
  FOR SELECT USING (auth.uid() = employer_id);
CREATE POLICY "Admins manage projects" ON project_contracts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
