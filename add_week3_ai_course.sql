-- Add Week 3 content for AI for Freelancers course
-- This script documents Week 3 structure for the AI course

-- Note: The content is now managed in the frontend code (week3_ai_content.ts)
-- This SQL is for reference and database documentation only

-- Week 3 Structure:
-- Module 5: AI for Creating Websites (5 lessons + activities + quiz)
--   - Lesson 5.1: What Are AI Website Builders?
--   - Lesson 5.2: Creating Your Website with Durable.co
--   - Lesson 5.3: Generating Website Content with AI
--   - Lesson 5.4: Simple Web Design Without Coding
--   - Lesson 5.5: Publishing and Sharing Your Website
--   - Lesson 5.6: Module 5 Practical Activities
--   - Quiz: Module 5 Self-Assessment

-- Module 6: AI for Time Management (6 lessons + activities + quiz)
--   - Lesson 6.1: Why Freelancers Need Time Management
--   - Lesson 6.2: Creating Schedules and Timetables with AI
--   - Lesson 6.3: Time Blocking for Deep Work
--   - Lesson 6.4: Free Productivity Tools
--   - Lesson 6.5: Managing Multiple Clients and Deadlines
--   - Lesson 6.6: Avoiding Burnout with AI
--   - Lesson 6.7: Module 6 Practical Activities
--   - Quiz: Module 6 Self-Assessment

-- Verify the AI course exists
SELECT 
    id, 
    title,
    category,
    duration,
    lessons_count,
    instructor
FROM academy_courses 
WHERE id = '00000000-0000-0000-0000-000000000001';

-- The course content is now fully managed in:
-- - Star9-Academy/src/hooks/week1_ai_content.ts (Week 1)
-- - Star9-Academy/src/hooks/week2_ai_content.ts (Week 2)
-- - Star9-Academy/src/hooks/week3_ai_content.ts (Week 3)
-- - Star9-Academy/src/hooks/useAcademyData.ts (Integration)

-- Week 3 Summary:
-- - 13 new lessons (6 in Module 5, 7 in Module 6)
-- - 2 new quizzes (Module 5 and Module 6)
-- - Estimated 5-7 hours of content
-- - Topics: AI Website Builders, Durable.co, Website Content, Web Design,
--   Publishing, Time Management, Schedules, Time Blocking, Productivity Tools,
--   Multiple Clients, Burnout Prevention

-- Total course now has:
-- Week 1: 2 modules (Module 1 + Module 2) with 11 lessons + 2 quizzes
-- Week 2: 2 modules (Module 3 + Module 4) with 10 lessons + 2 quizzes
-- Week 3: 2 modules (Module 5 + Module 6) with 13 lessons + 2 quizzes
-- Total: 6 modules, 34 lessons, 6 quizzes, 17-23 hours

SELECT 'Week 3 content successfully added to week3_ai_content.ts' as status;
