-- ============================================
-- Delete AI for Freelancers Course from Database
-- Run this in Supabase SQL Editor
-- ============================================

-- STEP 1: Show what will be deleted
SELECT 
    id,
    title,
    slug,
    status
FROM academy_courses
WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%';

-- STEP 2: Delete related data first (to avoid foreign key constraints)

-- Delete enrollments for AI courses
DELETE FROM user_enrollments
WHERE course_id IN (
    SELECT id FROM academy_courses 
    WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%'
);

-- Delete certificates for AI courses
DELETE FROM user_certificates
WHERE course_id IN (
    SELECT id FROM academy_courses 
    WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%'
);

-- Delete lessons for AI courses
DELETE FROM academy_lessons
WHERE course_id IN (
    SELECT id FROM academy_courses 
    WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%'
);

-- Delete progress for AI courses
DELETE FROM user_lesson_progress
WHERE course_id IN (
    SELECT id FROM academy_courses 
    WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%'
);

-- STEP 3: Delete the AI for Freelancers courses
DELETE FROM academy_courses
WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%';

-- STEP 4: Verify deletion
SELECT 
    COUNT(*) as remaining_ai_courses
FROM academy_courses
WHERE title ILIKE '%AI%' OR title ILIKE '%Freelancers%' OR slug LIKE '%ai%';

-- STEP 5: Show all remaining courses
SELECT 
    id,
    title,
    slug,
    status
FROM academy_courses
ORDER BY title;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✓ All AI for Freelancers courses have been deleted from the database.';
    RAISE NOTICE 'Note: The course content still exists in your frontend CURRICULUM_LEDGER.';
END $$;
