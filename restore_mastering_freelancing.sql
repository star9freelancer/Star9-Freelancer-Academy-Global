-- Restore Mastering Freelancing Course in Database
-- This ensures the course record exists with the correct ID and details

-- First, check if the course exists
SELECT 
    id, 
    title, 
    slug, 
    status,
    price
FROM academy_courses 
WHERE id = '22222222-2222-2222-2222-222222222222' 
   OR slug = 'mastering-freelancing';

-- Insert or update the Mastering Freelancing course
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
    '22222222-2222-2222-2222-222222222222',
    'mastering-freelancing',
    'Mastering Freelancing', 
    'Global Business', 
    ARRAY['Upwork', 'Fiverr', 'LinkedIn', 'Wise', 'Payoneer'], 
    'Transform your skills into a highly profitable, borderless business. This comprehensive foundational course provides the exact roadmap required to successfully launch, manage, and scale a lucrative freelancing career on the global stage.',
    ARRAY[
        'Construct a magnetic, high-converting global freelancer profile', 
        'Secure premium clients on major platforms like Upwork and Fiverr', 
        'Execute and manage complex projects with world-class professionalism', 
        'Cultivate a recognizable and trusted personal brand'
    ],
    'Student proficiency is rigorously evaluated through a live profile creation, practical proposal writing tasks, a mock client interview, and the submission of a fully developed freelance business plan.',
    '6 Weeks',
    '10-15 hrs/week',
    100,
    'published',
    'https://images.unsplash.com/photo-1454165833767-027ff339908a?auto=format&fit=crop&q=80&w=800'
)
ON CONFLICT (id) 
DO UPDATE SET
    slug = EXCLUDED.slug,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    ai_tools_covered = EXCLUDED.ai_tools_covered,
    overview = EXCLUDED.overview,
    learning_outcomes = EXCLUDED.learning_outcomes,
    assessment_details = EXCLUDED.assessment_details,
    duration = EXCLUDED.duration,
    commitment = EXCLUDED.commitment,
    price = EXCLUDED.price,
    status = EXCLUDED.status,
    image_url = EXCLUDED.image_url;

-- Verify the course was restored
SELECT 
    id, 
    title, 
    slug, 
    category,
    duration,
    price,
    status,
    created_at
FROM academy_courses 
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Check if there's a chat group for this course
SELECT 
    id,
    name,
    type,
    course_id
FROM chat_groups
WHERE course_id = '22222222-2222-2222-2222-222222222222';

-- Create chat group if it doesn't exist
INSERT INTO chat_groups (id, name, type, course_id)
VALUES (
    '66666666-6666-6666-6666-666666666666', 
    'Mastering Freelancing Cohort', 
    'course', 
    '22222222-2222-2222-2222-222222222222'
)
ON CONFLICT (id) DO NOTHING;

-- Final verification
SELECT 
    'Course restored successfully!' as status,
    COUNT(*) as course_count
FROM academy_courses 
WHERE id = '22222222-2222-2222-2222-222222222222';
