-- ============================================
-- Fix academy_enrollments table issue
-- This creates a view or renames the table
-- ============================================

-- Option 1: Create a view that maps academy_enrollments to user_enrollments
CREATE OR REPLACE VIEW academy_enrollments AS
SELECT * FROM user_enrollments;

-- Grant permissions on the view
GRANT SELECT, INSERT, UPDATE, DELETE ON academy_enrollments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON academy_enrollments TO anon;

-- Enable RLS on the view (if needed)
ALTER VIEW academy_enrollments SET (security_invoker = on);

-- Verify the view was created
SELECT 
    schemaname,
    viewname,
    viewowner
FROM pg_views
WHERE viewname = 'academy_enrollments';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✓ academy_enrollments view created successfully!';
    RAISE NOTICE 'This view maps to the user_enrollments table.';
    RAISE NOTICE 'All queries to academy_enrollments will now work.';
END $$;
