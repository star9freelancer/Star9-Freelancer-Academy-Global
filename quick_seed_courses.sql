-- Quick Seed: Just the Courses with Fixed UUIDs
-- Run this in Supabase SQL Editor

-- Clean up first
DELETE FROM academy_lessons WHERE course_id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');
DELETE FROM academy_courses WHERE id IN ('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333');

-- Insert the 3 courses with FIXED UUIDs that match CURRICULUM_LEDGER
INSERT INTO academy_courses (id, slug, title, category, ai_tools_covered, overview, learning_outcomes, assessment_details, duration, commitment, price, status, image_url)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'ai-for-freelancers',
    'AI for Freelancers', 
    'AI & Automation', 
    '{"ChatGPT", "Midjourney", "Zapier", "Make", "Claude"}', 
    'Future-proof your career. Master AI tools to multiply your productivity and income.',
    '{"Master AI fundamentals", "AI for content creation", "Workflow automation", "Sell AI services"}',
    'Complete assignments and final project',
    '4 Weeks',
    '10-15 hrs/week',
    50,
    'published',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'mastering-freelancing',
    'Mastering Freelancing', 
    'Global Business', 
    '{"Upwork", "Fiverr", "LinkedIn", "Wise", "Payoneer"}', 
    'Transform your skills into a profitable borderless business.',
    '{"Build high-converting profiles", "Win premium clients", "Manage projects professionally", "Build personal brand"}',
    'Profile creation, proposals, mock interview, business plan',
    '6 Weeks',
    '10-15 hrs/week',
    100,
    'published',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'teacher-prep',
    'International Teacher Preparation', 
    'Education & Global Mobility', 
    '{"Google Classroom", "Canva", "Canvas", "J1 Visa Platform"}', 
    'Prepare for elite international teaching opportunities, focused on USA J1 visa program.',
    '{"Navigate US K-12 system", "Ace international interviews", "Craft professional portfolios", "Lead multicultural classrooms"}',
    'Teaching demo video, resume, mock interview, lesson plan',
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
  status = EXCLUDED.status;

-- Verify the courses were created
SELECT id, title, slug, status FROM academy_courses ORDER BY created_at;
