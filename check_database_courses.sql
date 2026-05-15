-- ============================================
-- List All Courses Available in Database
-- Run this in Supabase SQL Editor
-- ============================================

-- Simple list of all courses with their IDs
SELECT 
    id,
    title,
    slug,
    status
FROM academy_courses
ORDER BY title;
