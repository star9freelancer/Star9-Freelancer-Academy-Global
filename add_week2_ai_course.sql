-- Add Week 2 content for AI for Freelancers course
-- This script documents Week 2 structure for the AI course

-- Note: The content is now managed in the frontend code (week2_ai_content.ts)
-- This SQL is for reference and database documentation only

-- Week 2 Structure:
-- Module 3: AI for Research and Writing (6 lessons + quiz)
--   - Lesson 3.1: AI for Fast Research
--   - Lesson 3.2: Writing Blogs, Articles, and Long-Form Content
--   - Lesson 3.3: Writing Client Proposals That Win Work
--   - Lesson 3.4: Writing Professional Emails and Follow-Ups
--   - Lesson 3.5: Editing and Proofreading with AI
--   - Lesson 3.6: Ethical Use of AI
--   - Quiz: Module 3 Self-Assessment

-- Module 4: AI for Analyzing Data (4 lessons + quiz)
--   - Lesson 4.1: Organizing Messy Data with AI
--   - Lesson 4.2: Calculations and Pattern Finding with AI
--   - Lesson 4.3: Creating Simple Charts with No Coding
--   - Lesson 4.4: Writing Client-Friendly Data Summaries
--   - Quiz: Module 4 Self-Assessment

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
-- - Star9-Academy/src/hooks/useAcademyData.ts (Integration)

-- Week 2 Summary:
-- - 10 new lessons (6 in Module 3, 4 in Module 4)
-- - 2 new quizzes (Module 3 and Module 4)
-- - Estimated 6-8 hours of content
-- - Topics: Research, Writing, Proposals, Emails, Editing, Ethics, Data Analysis, Charts

-- Total course now has:
-- Week 1: 2 modules (Module 1 + Module 2) with 11 lessons + 2 quizzes
-- Week 2: 2 modules (Module 3 + Module 4) with 10 lessons + 2 quizzes
-- Total: 4 modules, 21 lessons, 4 quizzes, 12-16 hours

SELECT 'Week 2 content successfully added to week2_ai_content.ts' as status;
