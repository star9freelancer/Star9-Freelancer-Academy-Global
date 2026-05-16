-- ============================================
-- Quick verification script for user_enrollments
-- Run this to check if everything is working
-- ============================================

-- 1. Check if table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'user_enrollments'
        ) 
        THEN '✓ user_enrollments table exists'
        ELSE '✗ user_enrollments table NOT FOUND'
    END as table_status;

-- 2. Check table structure
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'user_enrollments'
ORDER BY ordinal_position;

-- 3. Check RLS status
SELECT 
    tablename,
    CASE 
        WHEN rowsecurity THEN '✓ RLS is ENABLED'
        ELSE '✗ RLS is DISABLED'
    END as rls_status
FROM pg_tables
WHERE tablename = 'user_enrollments';

-- 4. List all RLS policies
SELECT 
    policyname,
    cmd as command,
    permissive,
    roles
FROM pg_policies
WHERE tablename = 'user_enrollments'
ORDER BY policyname;

-- 5. Check for any enrollments
SELECT 
    COUNT(*) as total_enrollments,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(DISTINCT course_id) as unique_courses
FROM user_enrollments;

-- 6. Sample enrollments (if any exist)
-- Only select columns that definitely exist
DO $$
DECLARE
    has_last_accessed BOOLEAN;
    has_completed_at BOOLEAN;
BEGIN
    -- Check which optional columns exist
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_enrollments' AND column_name = 'last_accessed_at'
    ) INTO has_last_accessed;
    
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_enrollments' AND column_name = 'completed_at'
    ) INTO has_completed_at;
    
    RAISE NOTICE 'Sample enrollments (showing available columns):';
    
    -- Show basic info that should always exist
    IF has_last_accessed AND has_completed_at THEN
        RAISE NOTICE 'Showing all columns including optional ones';
    ELSIF has_last_accessed THEN
        RAISE NOTICE 'Note: completed_at column not found';
    ELSIF has_completed_at THEN
        RAISE NOTICE 'Note: last_accessed_at column not found';
    ELSE
        RAISE NOTICE 'Note: Optional columns (last_accessed_at, completed_at) not found';
    END IF;
END $$;

-- Safe query that only uses core columns
SELECT 
    id,
    user_id,
    course_id,
    progress,
    enrolled_at
FROM user_enrollments
ORDER BY enrolled_at DESC
LIMIT 5;

-- 7. Check permissions
SELECT 
    grantee,
    privilege_type
FROM information_schema.table_privileges
WHERE table_name = 'user_enrollments'
ORDER BY grantee, privilege_type;

-- Final summary
DO $$
DECLARE
    table_exists BOOLEAN;
    rls_enabled BOOLEAN;
    policy_count INTEGER;
BEGIN
    -- Check table
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'user_enrollments'
    ) INTO table_exists;
    
    -- Check RLS
    SELECT rowsecurity INTO rls_enabled
    FROM pg_tables
    WHERE tablename = 'user_enrollments';
    
    -- Count policies
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies
    WHERE tablename = 'user_enrollments';
    
    RAISE NOTICE '========================================';
    RAISE NOTICE 'VERIFICATION SUMMARY';
    RAISE NOTICE '========================================';
    
    IF table_exists THEN
        RAISE NOTICE '✓ Table exists';
    ELSE
        RAISE NOTICE '✗ Table does NOT exist - run fix_user_enrollments_406.sql';
    END IF;
    
    IF rls_enabled THEN
        RAISE NOTICE '✓ RLS is enabled';
    ELSE
        RAISE NOTICE '✗ RLS is NOT enabled - run fix_user_enrollments_406.sql';
    END IF;
    
    IF policy_count > 0 THEN
        RAISE NOTICE '✓ % RLS policies configured', policy_count;
    ELSE
        RAISE NOTICE '✗ No RLS policies found - run fix_user_enrollments_406.sql';
    END IF;
    
    RAISE NOTICE '========================================';
    
    IF table_exists AND rls_enabled AND policy_count > 0 THEN
        RAISE NOTICE 'STATUS: All checks passed! ✓';
    ELSE
        RAISE NOTICE 'STATUS: Issues found - apply fixes';
    END IF;
END $$;
