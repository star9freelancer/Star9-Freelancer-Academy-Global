-- Seeding real Star9 Academy courses!

-- 1. Schema Hardening: Ensure rich content columns exist
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS overview text;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS learning_outcomes text[] DEFAULT '{}';
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS assessment_details text;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS duration text DEFAULT '10 Weeks';
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS commitment text DEFAULT '30-40 hrs/week';
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS price numeric DEFAULT 0;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS slug text;

-- Lesson Enhancements
ALTER TABLE academy_lessons ADD COLUMN IF NOT EXISTS content text;
ALTER TABLE academy_lessons ADD COLUMN IF NOT EXISTS quiz_data jsonb;

-- 2. Clean out old sample data for a fresh production sync
DELETE FROM academy_lessons;
DELETE FROM academy_courses;

-- 3. Insert Production Courses with FIXED UUIDs and Slugs
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

-- 4. Insert Lessons (referencing the FIXED UUIDs)
INSERT INTO academy_lessons (course_id, title, duration_minutes, order_index, type, video_url, content, quiz_data)
VALUES 
  (
    '11111111-1111-1111-1111-111111111111', 
    'Module 1: Introduction to AI and the Modern Freelance Economy', 
    45, 1, 'video', 'https://www.youtube.com/embed/a0_lo_UcwRU',
    '# Understanding the AI Shift\n\nThe freelance landscape is changing rapidly. Artificial Intelligence is no longer just a futuristic concept; it is a current tool that is redefining how work is delivered.\n\n### Why AI Matters for Freelancers\n- **Efficiency**: Automate repetitive tasks like research and basic drafting.\n- **Scalability**: Handle more clients without increasing hours.\n- **Quality**: Use AI as a high-level creative partner to brainstorm and refine ideas.',
    '{
      "questions": [
        {
          "id": 1,
          "question": "What is the primary benefit of AI for modern freelancers?",
          "options": ["Complete removal of human creativity", "Instant multiplication of productivity", "Elimination of client communication", "Automatic high-paying job assignments"],
          "correctAnswer": 1
        },
        {
          "id": 2,
          "question": "Which tool is best for automating cross-platform workflows?",
          "options": ["Midjourney", "ChatGPT", "Zapier", "Wise"],
          "correctAnswer": 2
        }
      ]
    }'
  ),
  (
    '11111111-1111-1111-1111-111111111111', 
    'Module 2: AI Tools for Content Creation (Featuring ChatGPT & Midjourney)', 
    60, 2, 'video', 'https://www.youtube.com/embed/In8AnzQv6-k',
    '# Mastering Content AI\n\nIn this module, we dive deep into the two titans of creative AI: ChatGPT for text and Midjourney for visual storytelling.\n\n### Key Concepts\n- **Prompt Engineering**: How to talk to AI to get the best results.\n- **Iterative Design**: Refining AI outputs for professional-grade quality.\n- **Visual Brand Synthesis**: Creating a consistent visual language with Midjourney.',
    '{
      "questions": [
        {
          "id": 1,
          "question": "What is Prompt Engineering?",
          "options": ["A way to fix broken computers", "The art of crafting precise instructions for AI", "A programming language used for web design", "A method for physical server maintenance"],
          "correctAnswer": 1
        }
      ]
    }'
  ),
  ('11111111-1111-1111-1111-111111111111', 'Module 3: Leveraging AI for Data Analysis and Deep Research', 50, 3, 'video', 'https://www.youtube.com/embed/ad79nYk2OUU', '# Data Intelligence\n\nLearn how to use AI to process large datasets and uncover insights that were previously hidden.', null),
  ('11111111-1111-1111-1111-111111111111', 'Module 4: Workflow Automation Tools (Mastering Zapier & Make)', 75, 4, 'video', 'https://www.youtube.com/embed/H65fINM31I8', '# Automating Success\n\nConnect your tools together to create a seamless, hands-free business environment.', null),
  ('11111111-1111-1111-1111-111111111111', 'Module 5: Architecting and Selling AI-Powered Services', 60, 5, 'video', 'https://www.youtube.com/embed/yZ2yv_rN0qg', '# Selling the Future\n\nPackage your new skills into high-value services that clients are eager to pay for.', null),
  ('11111111-1111-1111-1111-111111111111', 'Module 6: Ethics, Integrity, and Responsible AI Application', 40, 6, 'video', 'https://www.youtube.com/embed/2ePf9rue1Ao', '# Ethical AI\n\nMaintaining human integrity in an automated world.', null);

-- Course 2: Freelancing Essentials
INSERT INTO academy_lessons (course_id, title, duration_minutes, order_index, type, video_url)
VALUES 
  ('22222222-2222-2222-2222-222222222222', 'Module 1: Introduction to the Global Freelancing Landscape', 40, 1, 'video', 'https://www.youtube.com/embed/j14bT8jI0cI'),
  ('22222222-2222-2222-2222-222222222222', 'Module 2: Setting up High-Converting Profiles (Upwork, Fiverr, LinkedIn)', 90, 2, 'video', 'https://www.youtube.com/embed/E-0o4oN3O2M'),
  ('22222222-2222-2222-2222-222222222222', 'Module 3: The Art of Proposal Writing and Client Acquisition', 60, 3, 'video', 'https://www.youtube.com/embed/u_mC4Zp-4-s'),
  ('22222222-2222-2222-2222-222222222222', 'Module 4: Strategic Pricing and Confident Negotiation', 50, 4, 'video', 'https://www.youtube.com/embed/5a4n9730e_g'),
  ('22222222-2222-2222-2222-222222222222', 'Module 5: Mastering Client Communication and Retention', 45, 5, 'video', 'https://www.youtube.com/embed/g2qJ5-d6D0Y'),
  ('22222222-2222-2222-2222-222222222222', 'Module 6: The Blueprint for Scaling Your Freelance Business', 55, 6, 'video', 'https://www.youtube.com/embed/6iW_iO_sVq0');

-- Course 3: International Teacher Preparation
INSERT INTO academy_lessons (course_id, title, duration_minutes, order_index, type, video_url)
VALUES 
  ('33333333-3333-3333-3333-333333333333', 'Module 1: Comprehensive Overview of the US Education System', 60, 1, 'video', 'https://www.youtube.com/embed/0DqVcwv-974'),
  ('33333333-3333-3333-3333-333333333333', 'Module 2: Advanced Curriculum Planning and Modern Lesson Delivery', 75, 2, 'video', 'https://www.youtube.com/embed/v9S_oR891n0'),
  ('33333333-3333-3333-3333-333333333333', 'Module 3: Elite Classroom Management Strategies', 60, 3, 'video', 'https://www.youtube.com/embed/Wb199vSrnEE'),
  ('33333333-3333-3333-3333-333333333333', 'Module 4: Intensive Interview Preparation (J1 Visa Focus)', 90, 4, 'video', 'https://www.youtube.com/embed/U3H12GWeR_U'),
  ('33333333-3333-3333-3333-333333333333', 'Module 5: Professional Documentation (Resumes & Cover Letters)', 50, 5, 'video', 'https://www.youtube.com/embed/gRsUeI2Tawg'),
  ('33333333-3333-3333-3333-333333333333', 'Module 6: Cultural Adaptation and Global Teaching Ethics', 45, 6, 'video', 'https://www.youtube.com/embed/d-a3rE6EaTo');

-- 5. Create Core Chat Groups for Courses and General
INSERT INTO chat_groups (id, name, type, course_id)
VALUES 
  ('44444444-4444-4444-4444-444444444444', 'Global Freelancer Lounge', 'general', null),
  ('55555555-5555-5555-5555-555555555555', 'AI for Freelancers Cohort', 'course', '11111111-1111-1111-1111-111111111111'),
  ('66666666-6666-6666-6666-666666666666', 'Freelancing Essentials Cohort', 'course', '22222222-2222-2222-2222-222222222222'),
  ('77777777-7777-7777-7777-777777777777', 'International Teachers Cohort', 'course', '33333333-3333-3333-3333-333333333333')
ON CONFLICT (id) DO NOTHING;
