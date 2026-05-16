-- Update AI for Freelancers Course ID
-- This script updates the course ID from the old UUID to the new one
-- Run this in Supabase SQL Editor

-- Step 1: Check if the new course ID already exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM academy_courses WHERE id = '00000000-0000-0000-0000-000000000001') THEN
    RAISE NOTICE 'Course with ID 00000000-0000-0000-0000-000000000001 already exists';
  ELSE
    RAISE NOTICE 'Course with ID 00000000-0000-0000-0000-000000000001 does not exist yet';
  END IF;
END $$;

-- Step 2: Update or insert the AI for Freelancers course with the correct ID
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
  '00000000-0000-0000-0000-000000000001',
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
  image_url = EXCLUDED.image_url,
  updated_at = NOW();

-- Step 3: Verify the course was created/updated
SELECT 
  id, 
  title, 
  slug, 
  category,
  price,
  status,
  created_at,
  updated_at
FROM academy_courses 
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Step 4: Check if there are any enrollments for this course
SELECT 
  COUNT(*) as enrollment_count,
  MIN(created_at) as first_enrollment,
  MAX(created_at) as last_enrollment
FROM user_enrollments 
WHERE course_id = '00000000-0000-0000-0000-000000000001';

-- Step 5: Display all courses for verification
SELECT 
  id, 
  title, 
  slug, 
  price,
  status
FROM academy_courses 
ORDER BY created_at;
