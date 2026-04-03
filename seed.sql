-- Seeding real Star9 Academy courses!

-- First, ensure we have the modules_covered column
ALTER TABLE academy_courses ADD COLUMN IF NOT EXISTS modules_covered text[] DEFAULT '{}';

-- Clean out old sample data
DELETE FROM academy_courses;

-- Insert real content
INSERT INTO academy_courses (title, category, ai_tools_covered, modules_covered, status)
VALUES 
  (
    'Freelancing Foundations: Build Your Business', 
    'Freelancing', 
    '{}', 
    '{"Crafting High-Converting Resumes", "Optimizing Social Media Accounts for Client Acquisition", "Setting up Global Payment Accounts (Wise, PayPal, M-Pesa)", "Generating and Managing Professional Invoices"}', 
    'published'
  ),
  (
    'Master AI Tools for Freelance Efficiency', 
    'AI for Freelancers', 
    '{"ChatGPT", "Claude", "Midjourney", "Notion AI", "Lovable"}', 
    '{"Prompt Engineering Basics", "AI Tools You Can Use Daily (ChatGPT, Claude, Notion AI)", "Automating Repetitive Tasks"}', 
    'published'
  ),
  (
    'Enterprise Onboarding & Remote Workflows', 
    'Corporate Training', 
    '{}', 
    '{"Team Alignment in Remote Environments", "Standard Operating Procedures (SOPs)"}', 
    'draft'
  );
