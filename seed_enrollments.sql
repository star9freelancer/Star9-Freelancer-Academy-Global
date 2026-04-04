-- ============================================
-- Star9 Course Enrollment & Community Sync
-- Run this in Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS user_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended', 'payment_pending')),
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Index for scanning student progress
CREATE INDEX IF NOT EXISTS idx_user_enrollments_user ON user_enrollments(user_id);

-- ============================================
-- Community Auto-Join Trigger
-- ============================================

-- Function to add user to chat members when they enroll
CREATE OR REPLACE FUNCTION public.handle_course_enrollment()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The Trigger
DROP TRIGGER IF EXISTS on_course_enrollment ON public.user_enrollments;
CREATE TRIGGER on_course_enrollment
  AFTER INSERT ON public.user_enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_course_enrollment();

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid "already exists" errors
DROP POLICY IF EXISTS "Users see own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Users can enroll themselves" ON user_enrollments;

-- Students can read their own enrollments
CREATE POLICY "Users see own enrollments" 
ON user_enrollments FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Students can enroll themselves (initial enrollment)
CREATE POLICY "Users can enroll themselves" 
ON user_enrollments FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);
