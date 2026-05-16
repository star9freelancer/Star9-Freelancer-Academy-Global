-- ============================================
-- Check academy_courses table schema
-- Run this to see what columns exist
-- ============================================

-- Check if table exists
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = 'academy_courses'
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
WHERE table_name = 'academy_courses'
ORDER BY ordinal_position;

-- Show all courses
SELECT * FROM academy_courses;

-- Check if AI course exists
SELECT 
    id, 
    title,
    category,
    duration,
    lessons_count,
    instructor,
    created_at
FROM academy_courses 
WHERE id = '00000000-0000-0000-0000-000000000001';
