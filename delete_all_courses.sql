-- ============================================
-- DELETE ALL COURSES AND COURSE CONTENT
-- ⚠️ WARNING: This will permanently delete ALL course data!
-- Run this in Supabase SQL Editor
-- ============================================

-- STEP 1: Show what will be deleted (PREVIEW)
DO $$
DECLARE
    course_count INTEGER;
    lesson_count INTEGER;
    enrollment_count INTEGER;
    certificate_count INTEGER;
    progress_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO course_count FROM academy_courses;
    SELECT COUNT(*) INTO lesson_count FROM academy_lessons;
    SELECT COUNT(*) INTO enrollment_count FROM user_enrollments;
    SELECT COUNT(*) INTO certificate_count FROM user_certificates;
    SELECT COUNT(*) INTO progress_count FROM user_lesson_progress;
    
    RAISE NOTICE '=== DELETION PREVIEW ===';
    RAISE NOTICE 'Courses to delete: %', course_count;
    RAISE NOTICE 'Lessons to delete: %', lesson_count;
    RAISE NOTICE 'Enrollments to delete: %', enrollment_count;
    RAISE NOTICE 'Certificates to delete: %', certificate_count;
    RAISE NOTICE 'Progress records to delete: %', progress_count;
    RAISE NOTICE '';
    RAISE NOTICE '⚠️  THIS ACTION CANNOT BE UNDONE!';
    RAISE NOTICE 'Review the data below before proceeding with deletion.';
END $$;

-- Show all courses that will be deleted
SELECT 
    id,
    title,
    slug,
    status,
    created_at
FROM academy_courses
ORDER BY title;

-- STEP 2: Delete all related data (in correct order to avoid foreign key constraints)

-- Delete user lesson progress
DELETE FROM user_lesson_progress;

-- Delete user certificates
DELETE FROM user_certificates;

-- Delete user enrollments
DELETE FROM user_enrollments;

-- Delete academy lessons
DELETE FROM academy_lessons;

-- Delete academy courses
DELETE FROM academy_courses;

-- STEP 3: Verify deletion
DO $$
DECLARE
    course_count INTEGER;
    lesson_count INTEGER;
    enrollment_count INTEGER;
    certificate_count INTEGER;
    progress_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO course_count FROM academy_courses;
    SELECT COUNT(*) INTO lesson_count FROM academy_lessons;
    SELECT COUNT(*) INTO enrollment_count FROM user_enrollments;
    SELECT COUNT(*) INTO certificate_count FROM user_certificates;
    SELECT COUNT(*) INTO progress_count FROM user_lesson_progress;
    
    RAISE NOTICE '';
    RAISE NOTICE '=== DELETION COMPLETE ===';
    RAISE NOTICE 'Remaining courses: %', course_count;
    RAISE NOTICE 'Remaining lessons: %', lesson_count;
    RAISE NOTICE 'Remaining enrollments: %', enrollment_count;
    RAISE NOTICE 'Remaining certificates: %', certificate_count;
    RAISE NOTICE 'Remaining progress records: %', progress_count;
    RAISE NOTICE '';
    
    IF course_count = 0 THEN
        RAISE NOTICE '✓ All courses and related data have been successfully deleted.';
        RAISE NOTICE '';
        RAISE NOTICE 'NOTE: Course content in frontend CURRICULUM_LEDGER is NOT affected.';
        RAISE NOTICE 'You can re-create courses by running seed scripts.';
    ELSE
        RAISE NOTICE '⚠️  Warning: Some courses may still exist. Check for foreign key constraints.';
    END IF;
END $$;

-- STEP 4: Show final state
SELECT 
    'academy_courses' as table_name,
    COUNT(*) as remaining_records
FROM academy_courses
UNION ALL
SELECT 
    'academy_lessons',
    COUNT(*)
FROM academy_lessons
UNION ALL
SELECT 
    'user_enrollments',
    COUNT(*)
FROM user_enrollments
UNION ALL
SELECT 
    'user_certificates',
    COUNT(*)
FROM user_certificates
UNION ALL
SELECT 
    'user_lesson_progress',
    COUNT(*)
FROM user_lesson_progress;
