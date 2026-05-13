-- ============================================
-- Fix Missing Tables for Star9 Academy
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create user_enrollments table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended', 'payment_pending')),
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Index for scanning student progress
CREATE INDEX IF NOT EXISTS idx_user_enrollments_user ON user_enrollments(user_id);

-- 2. Create user_certificates table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
  certificate_url TEXT,
  issued_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- 3. Create academy_lessons table if it doesn't exist
CREATE TABLE IF NOT EXISTS academy_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  type TEXT DEFAULT 'video' CHECK (type IN ('video', 'article', 'quiz', 'assignment')),
  video_url TEXT,
  content TEXT,
  quiz_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_lessons ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users see own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Users can enroll themselves" ON user_enrollments;
DROP POLICY IF EXISTS "Users can update own progress" ON user_enrollments;
DROP POLICY IF EXISTS "Users see own certificates" ON user_certificates;
DROP POLICY IF EXISTS "Everyone can view published lessons" ON academy_lessons;

-- user_enrollments policies
CREATE POLICY "Users see own enrollments" 
ON user_enrollments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll themselves" 
ON user_enrollments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" 
ON user_enrollments FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- user_certificates policies
CREATE POLICY "Users see own certificates" 
ON user_certificates FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- academy_lessons policies (everyone can view)
CREATE POLICY "Everyone can view published lessons" 
ON academy_lessons FOR SELECT 
TO authenticated 
USING (true);

-- ============================================
-- Community Auto-Join Trigger
-- ============================================

-- Function to add user to chat members when they enroll
CREATE OR REPLACE FUNCTION public.handle_course_enrollment()
RETURNS TRIGGER AS $
DECLARE
  target_group_id UUID;
BEGIN
  -- Find the chat group for this course
  SELECT id INTO target_group_id 
  FROM public.chat_groups 
  WHERE course_id = NEW.course_id 
  LIMIT 1;

  -- If a group exists, add the user to it
  IF target_group_id IS NOT NULL THEN
    INSERT INTO public.chat_members (group_id, user_id)
    VALUES (target_group_id, NEW.user_id)
    ON CONFLICT (group_id, user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

-- The Trigger
DROP TRIGGER IF EXISTS on_course_enrollment ON public.user_enrollments;
CREATE TRIGGER on_course_enrollment
  AFTER INSERT ON public.user_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_course_enrollment();

-- ============================================
-- Success Message
-- ============================================
DO $
BEGIN
  RAISE NOTICE 'All missing tables and policies have been created successfully!';
END $;
