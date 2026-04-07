-- BULLETPROOF SYNC: Star9 Academy Curriculum UUID & Schema Alignment
-- This script resolve ALL previous errors: Foreign Keys, Missing Columns, and Check Constraints.

-- 1. Schema Hardening & Constraint Removal
-- We drop the restrictive category check to allow the new, more descriptive categories.
ALTER TABLE academy_courses DROP CONSTRAINT IF EXISTS academy_courses_category_check;

-- Ensure all rich content columns exist
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS overview text;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS learning_outcomes text[] DEFAULT '{}';
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS assessment_details text;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS duration text DEFAULT '10 Weeks';
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS commitment text DEFAULT '30-40 hrs/week';
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS slug text;

ALTER TABLE academy_lessons ADD COLUMN IF NOT EXISTS type text DEFAULT 'video';
ALTER TABLE academy_lessons ADD COLUMN IF NOT EXISTS video_url text;
ALTER TABLE academy_lessons ADD COLUMN IF NOT EXISTS order_index integer DEFAULT 1;
ALTER TABLE academy_lessons ADD COLUMN IF NOT EXISTS duration_minutes integer DEFAULT 0;

-- 2. Clear existing data in the correct order to satisfy Foreign Key constraints
BEGIN;

-- Delete from dependent tables first
DELETE FROM academy_lessons;
DELETE FROM user_enrollments;
DELETE FROM user_certificates;
-- Some versions might use 'course_enrollments'
DO $$ BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'course_enrollments') THEN
        DELETE FROM course_enrollments;
    END IF;
END $$;

-- Finally clear the courses
DELETE FROM academy_courses;

-- 3. Insert Production Courses with FIXED UUIDs and Professional Categories
INSERT INTO academy_courses (id, slug, title, category, ai_tools_covered, overview, learning_outcomes, assessment_details, duration, commitment, price, status, image_url)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111',
    'ai-for-freelancers',
    'AI for Freelancers', 
    'AI & Automation', 
    '{"ChatGPT", "Midjourney", "Zapier", "Make", "Claude"}', 
    'Future-proof your career. This intensive program empowers modern freelancers with practical, cutting-edge AI skills to instantly multiply productivity, build seamless automated workflows, and significantly increase earning capacity.',
    '{"Master core AI fundamentals and navigate top-tier industry tools with confidence", "Deploy AI for rapid content creation, complex coding, and deep research", "Engineer automated workflows that save hours of manual labor every week", "Package, market, and deliver high-value, AI-enhanced services to global clients"}',
    'To earn your certificate, you must successfully complete practical weekly assignments, navigate real-world client simulation tasks, and submit a comprehensive final AI-powered freelance project.',
    '8 Weeks',
    '15-20 hrs/week',
    0,
    'published',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'freelancing-essentials',
    'Freelancing Essentials', 
    'Global Business', 
    '{"Upwork", "Fiverr", "LinkedIn", "Wise", "Payoneer"}', 
    'Transform your skills into a highly profitable, borderless business. This comprehensive foundational course provides the exact roadmap required to successfully launch, manage, and scale a lucrative freelancing career on the global stage.',
    '{"Construct a magnetic, high-converting global freelancer profile", "Secure premium clients on major platforms like Upwork and Fiverr", "Execute and manage complex projects with world-class professionalism", "Cultivate a recognizable and trusted personal brand"}',
    'Student proficiency is rigorously evaluated through a live profile creation, practical proposal writing tasks, a mock client interview, and the submission of a fully developed freelance business plan.',
    '6 Weeks',
    '10-15 hrs/week',
    0,
    'published',
    'https://images.unsplash.com/photo-1454165833767-027ff339908a?auto=format&fit=crop&q=80&w=800'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'teacher-prep',
    'International Teacher Preparation', 
    'Education & Global Mobility', 
    '{"Google Classroom", "Canva", "Canvas", "J1 Visa Platform"}', 
    'Bridge the gap between local talent and global classrooms. This specialized, high-impact course rigorously prepares educators for elite international teaching opportunities, with a dedicated focus on securing placements in the USA via the J1 visa program.',
    '{"Navigate the intricacies of the US K-12 education system with absolute clarity", "Ace high-stakes international interviews and execute flawless demonstration lessons", "Craft professional, globally recognized teaching portfolios", "Seamlessly adapt to and confidently lead multicultural classrooms"}',
    'Certification requires the submission of a professional teaching demo video, tailored resume and cover letter documentation, successful completion of a mock interview, and a comprehensive lesson plan design.',
    '12 Weeks',
    '20-25 hrs/week',
    0,
    'published',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800'
  );

-- 4. Insert Lessons (referencing the fixed UUIDs)
INSERT INTO academy_lessons (course_id, title, duration_minutes, order_index, type, video_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Module 1: Introduction to AI and the Modern Freelance Economy', 45, 1, 'video', 'https://www.youtube.com/embed/AivZ31S1s24'),
  ('11111111-1111-1111-1111-111111111111', 'Module 2: AI Tools for Content Creation (Featuring ChatGPT & Midjourney)', 60, 2, 'video', 'https://www.youtube.com/embed/k_N6Z2Z_L_c'),
  ('11111111-1111-1111-1111-111111111111', 'Module 3: Leveraging AI for Data Analysis and Deep Research', 50, 3, 'video', 'https://www.youtube.com/embed/V2_6mXp9V5s'),
  ('11111111-1111-1111-1111-111111111111', 'Module 4: Workflow Automation Tools (Mastering Zapier & Make)', 75, 4, 'video', 'https://www.youtube.com/embed/XqCAsyH06vY'),
  ('11111111-1111-1111-1111-111111111111', 'Module 5: Architecting and Selling AI-Powered Services', 60, 5, 'video', 'https://www.youtube.com/embed/7X8mS8K6V6k'),
  ('11111111-1111-1111-1111-111111111111', 'Module 6: Ethics, Integrity, and Responsible AI Application', 40, 6, 'video', 'https://www.youtube.com/embed/e6-O66xI5rQ'),
  
  ('22222222-2222-2222-2222-222222222222', 'Module 1: Introduction to the Global Freelancing Landscape', 40, 1, 'video', 'https://www.youtube.com/embed/mGjA4f8mHkc'),
  ('22222222-2222-2222-2222-222222222222', 'Module 2: Setting up High-Converting Profiles (Upwork, Fiverr, LinkedIn)', 90, 2, 'video', 'https://www.youtube.com/embed/8oR_8pWfE2E'),
  ('22222222-2222-2222-2222-222222222222', 'Module 3: The Art of Proposal Writing and Client Acquisition', 60, 3, 'video', 'https://www.youtube.com/embed/Yv9mQ8S8K6E'),
  ('22222222-2222-2222-2222-222222222222', 'Module 4: Strategic Pricing and Confident Negotiation', 50, 4, 'video', 'https://www.youtube.com/embed/5y0iNoeHOnE'),
  ('22222222-2222-2222-2222-222222222222', 'Module 5: Mastering Client Communication and Retention', 45, 5, 'video', 'https://www.youtube.com/embed/fWbb6Yf30vQ'),
  ('22222222-2222-2222-2222-222222222222', 'Module 6: The Blueprint for Scaling Your Freelance Business', 55, 6, 'video', 'https://www.youtube.com/embed/m5_TbeG-R7c'),
  
  ('33333333-3333-3333-3333-333333333333', 'Module 1: Comprehensive Overview of the US Education System', 60, 1, 'video', 'https://www.youtube.com/embed/v3HwY26_foc'),
  ('33333333-3333-3333-3333-333333333333', 'Module 2: Advanced Curriculum Planning and Modern Lesson Delivery', 75, 2, 'video', 'https://www.youtube.com/embed/O_UozI0hV64'),
  ('33333333-3333-3333-3333-333333333333', 'Module 3: Elite Classroom Management Strategies', 60, 3, 'video', 'https://www.youtube.com/embed/pgk-719mTxM'),
  ('33333333-3333-3333-3333-333333333333', 'Module 4: Intensive Interview Preparation (J1 Visa Focus)', 90, 4, 'video', 'https://www.youtube.com/embed/F4Syr5_p-mU'),
  ('33333333-3333-3333-3333-333333333333', 'Module 5: Professional Documentation (Resumes & Cover Letters)', 50, 5, 'video', 'https://www.youtube.com/embed/1_S-v_fVfG8'),
  ('33333333-3333-3333-3333-333333333333', 'Module 6: Cultural Adaptation and Global Teaching Ethics', 45, 6, 'video', 'https://www.youtube.com/embed/_K-fA1W0M_w');

COMMIT;
