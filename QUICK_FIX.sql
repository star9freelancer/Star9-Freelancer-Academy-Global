-- ============================================
-- QUICK FIX - Run this if you just want it fixed
-- This is a simplified version that handles most cases
-- ============================================

-- Create the table with minimal required columns
CREATE TABLE IF NOT EXISTS user_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    progress INTEGER DEFAULT 0,
    UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE user_enrollments ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Users can insert their own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Users can update their own enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Admins can view all enrollments" ON user_enrollments;
DROP POLICY IF EXISTS "Admins can manage all enrollments" ON user_enrollments;

-- Create simple policies
CREATE POLICY "Users can view their own enrollments"
    ON user_enrollments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments"
    ON user_enrollments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments"
    ON user_enrollments FOR UPDATE
    USING (auth.uid() = user_id);

-- Admin policies
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
GRANT ALL ON user_enrollments TO authenticated;
GRANT SELECT ON user_enrollments TO anon;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_enrollments_user_id ON user_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_enrollments_course_id ON user_enrollments(course_id);

-- Success message
DO $$
BEGIN
    RAISE NOTICE '========================================';
    RAISE NOTICE '✓ QUICK FIX APPLIED SUCCESSFULLY!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Refresh your browser (Ctrl+Shift+R)';
    RAISE NOTICE '2. Check console - should be clean';
    RAISE NOTICE '3. Test course enrollment';
    RAISE NOTICE '========================================';
END $$;
