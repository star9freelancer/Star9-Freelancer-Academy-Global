-- ============================================
-- Check current user_enrollments schema
-- Run this FIRST to see what you have
-- ============================================

-- Check if table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'user_enrollments'
        ) 
        THEN '✓ Table EXISTS'
        ELSE '✗ Table NOT FOUND'
    END as status;

-- Show all columns that currently exist
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'user_enrollments'
ORDER BY ordinal_position;

-- Show sample data (if any)
SELECT * FROM user_enrollments LIMIT 3;

-- Show RLS status
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename = 'user_enrollments';

-- Show existing policies
SELECT 
    policyname,
    cmd
FROM pg_policies
WHERE tablename = 'user_enrollments';
