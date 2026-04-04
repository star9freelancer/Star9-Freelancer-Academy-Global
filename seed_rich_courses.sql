-- Step 1: Upgrade the Course Schema to support JSONB lessons
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS lessons JSONB DEFAULT '[]';

-- Step 2: Create the Certificate Ledger
CREATE TABLE IF NOT EXISTS user_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES academy_courses(id),
  credential_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Step 3: Clear existing sample courses to avoid duplicates
DELETE FROM academy_courses;

-- Step 4: Inject Advanced Mock Modules
INSERT INTO academy_courses (title, category, status, lessons, ai_tools_covered)
VALUES 
(
  'The Freelance AI Masterclass', 
  'AI Skills', 
  'published',
  '[
    {"id": "l1", "title": "Precision Prompt Engineering", "type": "video", "url": "https://www.youtube.com/watch?v=jC4v5AS4RIM"},
    {"id": "l2", "title": "Building AI Workflows with Notion", "type": "video", "url": "https://www.youtube.com/watch?v=S57YvW8o960"},
    {"id": "l3", "title": "Final Technical Validation", "type": "quiz", "url": "quiz_data", "content": "{\"questions\": [{\"q\": \"Which AI model is prioritized for long-context reasoning?\", \"options\": [\"GPT-4o\", \"Claude 3.5 Sonnet\", \"DALL-E 3\"], \"correct\": 1}]}"}
  ]'::jsonb,
  '{"ChatGPT", "Claude", "Notion AI"}'
),
(
  'Global Business Communication Protocols', 
  'Freelancing', 
  'published',
  '[
    {"id": "g1", "title": "High-Ticket Client Acquisition", "type": "video", "url": "https://www.youtube.com/watch?v=vpG27vS_4-4"},
    {"id": "g2", "title": "Managing Global Payments (Wise/M-Pesa)", "type": "video", "url": "https://www.youtube.com/watch?v=XW9zreByW2s"},
    {"id": "g3", "title": "Onboarding Mastery Test", "type": "quiz", "url": "quiz_data", "content": "{\"questions\": [{\"q\": \"What is the primary benefit of using Wise for global payouts?\", \"options\": [\"Lower fees than PayPal\", \"Instant crypto conversion\", \"Zero verification required\"], \"correct\": 0}]}"}
  ]'::jsonb,
  '{}'
);
