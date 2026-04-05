-- ============================================
-- Star9 Career Engine & Study Ledger
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Academy Job Listings
CREATE TABLE IF NOT EXISTS academy_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT DEFAULT 'Remote',
  salary_range TEXT,
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  type TEXT NOT NULL DEFAULT 'Full-Time' CHECK (type IN ('Full-Time', 'Part-Time', 'Contract', 'Freelance')),
  application_url TEXT,
  posted_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 2. User Lesson Progress (Learning Persistence)
CREATE TABLE IF NOT EXISTS user_lesson_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES academy_lessons(id) ON DELETE CASCADE,
  completed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course ON user_lesson_progress(course_id);

-- RLS Policies
ALTER TABLE academy_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can see active jobs" ON academy_jobs;
CREATE POLICY "Anyone can see active jobs" ON academy_jobs FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Users can see own progress" ON user_lesson_progress;
CREATE POLICY "Users can see own progress" ON user_lesson_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can mark progress" ON user_lesson_progress;
CREATE POLICY "Users can mark progress" ON user_lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Sample Job Data
INSERT INTO academy_jobs (title, company, location, salary_range, type, description, requirements)
VALUES 
  (
    'AI Integration Specialist', 
    'Star9 Systems', 
    'Remote (Global)', 
    '$3k - $5k / mo', 
    'Full-Time', 
    'Looking for a certified Star9 practitioner to oversee the deployment of autonomous workflow agents for our enterprise clients.',
    '{"Star9 AI Foundation Certificate", "Proven experience with Claude & GPT API", "Strong communication skills"}'
  ),
  (
    'Technical Freelance Associate', 
    'Nova Dynamics', 
    'Nairobi (Hybrid)', 
    'Ksh 150k - 250k', 
    'Contract', 
    'Join our local node to assist in high-speed digital product delivery using the Star9 efficiency stack.',
    '{"Mastery of Lovable & Supabase", "Available for immediate onboarding"}'
  );
