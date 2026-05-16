-- ============================================
-- Fix 406 Not Acceptable error on user_enrollments
-- ============================================

-- First, let's check what columns actually exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'user_enrollments'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'user_enrollments';

-- Check existing RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'user_enrollments';

-- If the table doesn't have proper structure, let's ensure it exists with correct columns
CREATE TABLE IF NOT EXISTS user_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES academy_courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    progress INTEGER DEFAULT 0,
    UNIQUE(user_id, course_id)
);

-- Add optional columns if they don't exist (safe to run multiple times)
DO $$ 
BEGIN
    -- Add completed_at if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_enrollments' AND column_name = 'completed_at'
    ) THEN
        ALTER TABLE user_enrollments ADD COLUMN completed_at TIMESTAMPTZ;
        RAISE NOTICE 'Added column: completed_at';
    END IF;
    
    -- Add last_accessed_at if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_enrollments' AND column_name = 'last_accessed_at'
    ) THEN
        ALTER TABLE user_enrollments ADD COLUMN last_accessed_at TIMESTAMPTZ;
        RAISE NOTICE 'Added column: last_accessed_at';
    END IF;
    
    -- Add current_module_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_enrollments' AND column_name = 'current_module_id'
    ) THEN
        ALTER TABLE user_enrollments ADD COLUMN current_module_id TEXT;
        RAISE NOTICE 'Added column: current_module_id';
    END IF;
    
    -- Add current_lesson_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_enrollments' AND column_name = 'current_lesson_id'
    ) THEN
        ALTER TABLE user_enrollments ADD COLUMN current_lesson_id TEXT;
        RAISE NOTICE 'Added column: current_lesson_id';
    END IF;
END $$;

-- Enable RLS
ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON user_enrollments;

-- Create simple, permissive RLS policies
CREATE POLICY "Users can view their own enrollments"
    ON user_enrollments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments"
    ON user_enrollments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
    ON user_enrollments FOR UPDATE
    USING (auth.uid() = user_id);

-- Admin policies (if you have an admin role)
CREATE POLICY "Admins can view all enrollments"
    ON user_enrollments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all enrollments"
    ON user_enrollments FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON user_enrollments TO authenticated;
GRANT SELECT ON user_enrollments TO anon;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_enrollments_user_id ON user_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_enrollments_course_id ON user_enrollments(course_id);

-- Verify the fix
SELECT 'user_enrollments table structure:' as info;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'user_enrollments'
ORDER BY ordinal_position;

SELECT 'RLS policies:' as info;
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'user_enrollments';

DO $$
BEGIN
    RAISE NOTICE '✓ user_enrollments table fixed!';
    RAISE NOTICE 'The 406 error should now be resolved.';
    RAISE NOTICE 'Make sure to refresh your browser to clear any cached errors.';
END $$;
