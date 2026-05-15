-- ============================================
-- Check AI for Freelancers Course Modules in Database
-- Run this in Supabase SQL Editor
-- ============================================

-- STEP 1: Find the AI for Freelancers course
SELECT 
    id,
    title,
    slug,
    status,
    duration,
    created_at
FROM academy_courses
WHERE title ILIKE '%AI%' OR slug LIKE '%ai%'
ORDER BY created_at DESC;

-- STEP 2: Check if there are any lessons for AI courses in the database
SELECT 
    l.id as lesson_id,
    l.title as lesson_title,
    l.duration_minutes,
    l.order_index,
    l.type,
    c.id as course_id,
    c.title as course_title
FROM academy_lessons l
JOIN academy_courses c ON l.course_id = c.id
WHERE c.title ILIKE '%AI%' OR c.slug LIKE '%ai%'
ORDER BY l.order_index;

-- STEP 3: Count lessons per AI course
SELECT 
    c.id as course_id,
    c.title as course_title,
    COUNT(l.id) as total_lessons
FROM academy_courses c
LEFT JOIN academy_lessons l ON c.id = l.course_id
WHERE c.title ILIKE '%AI%' OR c.slug LIKE '%ai%'
GROUP BY c.id, c.title;

-- STEP 4: Check the specific course ID you mentioned
SELECT 
    id,
    title,
    slug,
    status,
    category,
    duration
FROM academy_courses
WHERE id = '6e1a970e-1d2a-46ee-a483-0e93fdc4d826';

-- STEP 5: Check lessons for the specific course ID
SELECT 
    id as lesson_id,
    title as lesson_title,
    duration_minutes,
    order_index,
    type,
    video_url,
    CASE 
        WHEN content IS NOT NULL THEN 'Has content'
        ELSE 'No content'
    END as content_status
FROM academy_lessons
WHERE course_id = '6e1a970e-1d2a-46ee-a483-0e93fdc4d826'
ORDER BY order_index;

-- STEP 6: Summary
DO $$
DECLARE
    course_count INTEGER;
    lesson_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO course_count 
    FROM academy_courses 
    WHERE id = '6e1a970e-1d2a-46ee-a483-0e93fdc4d826';
    
    SELECT COUNT(*) INTO lesson_count 
    FROM academy_lessons 
    WHERE course_id = '6e1a970e-1d2a-46ee-a483-0e93fdc4d826';
    
    RAISE NOTICE '=== AI FOR FREELANCERS COURSE STATUS ===';
    RAISE NOTICE 'Course exists in database: %', CASE WHEN course_count > 0 THEN 'YES' ELSE 'NO' END;
    RAISE NOTICE 'Lessons in database: %', lesson_count;
    RAISE NOTICE '';
    RAISE NOTICE 'NOTE: The detailed course content (6 modules with all lessons, videos, quizzes)';
    RAISE NOTICE 'is stored in the frontend CURRICULUM_LEDGER, not in the database.';
    RAISE NOTICE 'The database only needs the basic course record with ID: 6e1a970e-1d2a-46ee-a483-0e93fdc4d826';
END $$;
