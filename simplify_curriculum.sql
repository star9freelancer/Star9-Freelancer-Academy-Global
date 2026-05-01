-- SYNC SIMPLIFIED MODULE TITLES
-- Run this in your Supabase SQL Editor to update the database values to match the new UI.

BEGIN;

-- AI for Freelancers
UPDATE academy_lessons SET title = 'AI Foundations' WHERE course_id = '11111111-1111-1111-1111-111111111111' AND order_index = 1;
UPDATE academy_lessons SET title = 'Content Creation' WHERE course_id = '11111111-1111-1111-1111-111111111111' AND order_index = 2;
UPDATE academy_lessons SET title = 'Data & Research' WHERE course_id = '11111111-1111-1111-1111-111111111111' AND order_index = 3;
UPDATE academy_lessons SET title = 'Automation' WHERE course_id = '11111111-1111-1111-1111-111111111111' AND order_index = 4;
UPDATE academy_lessons SET title = 'Monetization' WHERE course_id = '11111111-1111-1111-1111-111111111111' AND order_index = 5;
UPDATE academy_lessons SET title = 'Ethics & Integrity' WHERE course_id = '11111111-1111-1111-1111-111111111111' AND order_index = 6;

-- Mastering Freelancing
UPDATE academy_lessons SET title = 'Global Landscape' WHERE course_id = '22222222-2222-2222-2222-222222222222' AND order_index = 1;
UPDATE academy_lessons SET title = 'Profile Mastery' WHERE course_id = '22222222-2222-2222-2222-222222222222' AND order_index = 2;
UPDATE academy_lessons SET title = 'Client Acquisition' WHERE course_id = '22222222-2222-2222-2222-222222222222' AND order_index = 3;
UPDATE academy_lessons SET title = 'Pricing & Strategy' WHERE course_id = '22222222-2222-2222-2222-222222222222' AND order_index = 4;
UPDATE academy_lessons SET title = 'Communication' WHERE course_id = '22222222-2222-2222-2222-222222222222' AND order_index = 5;
UPDATE academy_lessons SET title = 'Scaling Up' WHERE course_id = '22222222-2222-2222-2222-222222222222' AND order_index = 6;

-- Teacher Prep
UPDATE academy_lessons SET title = 'US System Intro' WHERE course_id = '33333333-3333-3333-3333-333333333333' AND order_index = 1;
UPDATE academy_lessons SET title = 'Planning & Delivery' WHERE course_id = '33333333-3333-3333-3333-333333333333' AND order_index = 2;
UPDATE academy_lessons SET title = 'Classroom Management' WHERE course_id = '33333333-3333-3333-3333-333333333333' AND order_index = 3;
UPDATE academy_lessons SET title = 'Interview Prep' WHERE course_id = '33333333-3333-3333-3333-333333333333' AND order_index = 4;
UPDATE academy_lessons SET title = 'Pro Documentation' WHERE course_id = '33333333-3333-3333-3333-333333333333' AND order_index = 5;
UPDATE academy_lessons SET title = 'Global Ethics' WHERE course_id = '33333333-3333-3333-3333-333333333333' AND order_index = 6;

COMMIT;
