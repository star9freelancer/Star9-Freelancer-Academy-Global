-- ============================================
-- Star9 Course Enrollment Schema
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
-- Row Level Security
-- ============================================

ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;

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

-- Admins can update/delete any enrollment (manual overrides)
-- No explicit admin policy needed if we assume super-user or service-role, 
-- but we can add one if Star9 has an 'is_admin' profile field.
-- Assuming standard authenticated access for now.
