-- ============================================
-- Add AI for Freelancers Course with Simple ID
-- Run this in Supabase SQL Editor
-- ============================================

-- Delete any existing AI for Freelancers courses first
DELETE FROM user_lesson_progress WHERE course_id IN (SELECT id FROM academy_courses WHERE title ILIKE '%AI%' OR slug LIKE '%ai%');
DELETE FROM user_certificates WHERE course_id IN (SELECT id FROM academy_courses WHERE title ILIKE '%AI%' OR slug LIKE '%ai%');
DELETE FROM user_enrollments WHERE course_id IN (SELECT id FROM academy_courses WHERE title ILIKE '%AI%' OR slug LIKE '%ai%');
DELETE FROM academy_lessons WHERE course_id IN (SELECT id FROM academy_courses WHERE title ILIKE '%AI%' OR slug LIKE '%ai%');
DELETE FROM academy_courses WHERE title ILIKE '%AI%' OR slug LIKE '%ai%';

-- Insert AI for Freelancers course with simple ID
INSERT INTO academy_courses (
    id,
    slug,
    title,
    category,
    ai_tools_covered,
    overview,
    learning_outcomes,
    assessment_details,
    duration,
    commitment,
    price,
    status,
    image_url
)
VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,  -- Simple, memorable UUID
    'ai-for-freelancers',
    'AI for Freelancers',
    'AI & Automation',
    ARRAY['ChatGPT', 'Midjourney', 'Zapier', 'Make', 'Claude'],
    'Future-proof your career. Master AI tools to multiply your productivity and income as a freelancer.',
    ARRAY[
        'Master AI fundamentals and prompt engineering',
        'Use AI for content creation and automation',
        'Build AI-powered workflows',
        'Sell AI services to clients'
    ],
    'Complete weekly assignments and final AI-powered freelance project',
    '4 Weeks',
    '10-15 hrs/week',
    50,
    'published',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    status = EXCLUDED.status;

-- Verify the course was created
SELECT 
    id,
    title,
    slug,
    status,
    duration,
    price
FROM academy_courses
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✓ AI for Freelancers course created successfully!';
    RAISE NOTICE 'Course ID: 00000000-0000-0000-0000-000000000001';
    RAISE NOTICE 'Title: AI for Freelancers';
    RAISE NOTICE 'Status: published';
    RAISE NOTICE '';
    RAISE NOTICE 'Next step: Update CURRICULUM_LEDGER in useAcademyData.ts to use this ID.';
    RAISE NOTICE 'The detailed course content (6 modules) will be loaded from the frontend.';
END $$;
