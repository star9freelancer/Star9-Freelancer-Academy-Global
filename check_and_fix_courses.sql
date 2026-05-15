-- ============================================
-- Check and Fix Course IDs for Star9 Academy
-- Run this in Supabase SQL Editor
-- ============================================

-- STEP 1: Check what courses currently exist
SELECT 
    id, 
    title, 
    slug, 
    status,
    created_at
FROM academy_courses
ORDER BY created_at;

-- STEP 2: Check if the required course IDs exist
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM academy_courses WHERE id = '11111111-1111-1111-1111-111111111111') 
        THEN '✓ AI for Freelancers course ID exists'
        ELSE '✗ AI for Freelancers course ID MISSING'
    END as ai_course_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM academy_courses WHERE id = '22222222-2222-2222-2222-222222222222') 
        THEN '✓ Mastering Freelancing course ID exists'
        ELSE '✗ Mastering Freelancing course ID MISSING'
    END as freelancing_course_status,
    CASE 
        WHEN EXISTS (SELECT 1 FROM academy_courses WHERE id = '33333333-3333-3333-3333-333333333333') 
        THEN '✓ Teacher Prep course ID exists'
        ELSE '✗ Teacher Prep course ID MISSING'
    END as teacher_course_status;

-- STEP 3: Delete any courses with wrong IDs (OPTIONAL - uncomment if needed)
-- DELETE FROM academy_courses 
-- WHERE id NOT IN (
--     '11111111-1111-1111-1111-111111111111',
--     '22222222-2222-2222-2222-222222222222',
--     '33333333-3333-3333-3333-333333333333'
-- );

-- STEP 4: Insert or Update courses with correct IDs
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
VALUES 
    -- AI for Freelancers
    (
        '11111111-1111-1111-1111-111111111111',
        'ai-for-freelancers',
        'AI for Freelancers', 
        'AI & Automation', 
        ARRAY['ChatGPT', 'Midjourney', 'Zapier', 'Make', 'Claude'],
        'Future-proof your career. This intensive program empowers modern freelancers with practical, cutting-edge AI skills to instantly multiply productivity, build seamless automated workflows, and significantly increase earning capacity.',
        ARRAY[
            'Master core AI fundamentals and navigate top-tier industry tools with confidence',
            'Deploy AI for rapid content creation, complex coding, and deep research',
            'Engineer automated workflows that save hours of manual labor every week',
            'Package, market, and deliver high-value, AI-enhanced services to global clients'
        ],
        'To earn your certificate, you must successfully complete practical weekly assignments, navigate real-world client simulation tasks, and submit a comprehensive final AI-powered freelance project.',
        '4 Weeks',
        '10-15 hrs/week',
        50,
        'published',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
    ),
    -- Mastering Freelancing
    (
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
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
    ),
    -- International Teacher Preparation
    (
        '33333333-3333-3333-3333-333333333333',
        'teacher-prep',
        'International Teacher Preparation', 
        'Education & Global Mobility', 
        ARRAY['Google Classroom', 'Canva', 'Canvas', 'J1 Visa Platform'],
        'Bridge the gap between local talent and global classrooms. This specialized, high-impact course rigorously prepares educators for elite international teaching opportunities, with a dedicated focus on securing placements in the USA via the J1 visa program.',
        ARRAY[
            'Navigate the intricacies of the US K-12 education system with absolute clarity',
            'Ace high-stakes international interviews and execute flawless demonstration lessons',
            'Craft professional, globally recognized teaching portfolios',
            'Seamlessly adapt to and confidently lead multicultural classrooms'
        ],
        'Certification requires the submission of a professional teaching demo video, tailored resume and cover letter documentation, successful completion of a mock interview, and a comprehensive lesson plan design.',
        '12 Weeks',
        '20-25 hrs/week',
        1500,
        'published',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
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

-- STEP 5: Verify the courses are now correct
SELECT 
    id, 
    title, 
    slug, 
    status,
    duration,
    price,
    created_at
FROM academy_courses
WHERE id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333'
)
ORDER BY created_at;

-- STEP 6: Final verification message
DO $$
BEGIN
    IF (SELECT COUNT(*) FROM academy_courses WHERE id IN (
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        '33333333-3333-3333-3333-333333333333'
    )) = 3 THEN
        RAISE NOTICE '✓ SUCCESS: All 3 courses with correct IDs are now in the database!';
        RAISE NOTICE 'The detailed course content (modules, lessons, videos) is in your frontend CURRICULUM_LEDGER.';
        RAISE NOTICE 'Refresh your browser and the courses should now display with all content!';
    ELSE
        RAISE NOTICE '✗ WARNING: Not all courses were created. Check the errors above.';
    END IF;
END $$;
