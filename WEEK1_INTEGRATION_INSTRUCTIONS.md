# Week 1 AI Course Content - Integration Instructions

## Overview
Week 1 content for "AI for Freelancers" course has been prepared. The content is stored in the frontend (TypeScript) rather than the database, following the existing architecture pattern.

## What Was Created

### 1. `week1_ai_content.ts`
Contains the complete Week 1 curriculum with 2 modules:
- **Module 1: Introduction to AI for Freelancing** (2-3 hours)
  - 5 lessons + 1 quiz
- **Module 2: AI for Social Media Marketing** (3-4 hours)
  - 5 lessons + 1 quiz

Total: 12 lessons covering 5-7 hours of content

## How to Integrate

### Option 1: Replace Existing AI Course Content (Recommended)

In `src/hooks/useAcademyData.ts`, find the section for course ID `"00000000-0000-0000-0000-000000000001"` and replace the modules array with the content from `week1_ai_content.ts`.

**Steps:**
1. Open `src/hooks/useAcademyData.ts`
2. Import the Week 1 content at the top:
   ```typescript
   import { WEEK_1_AI_MODULES } from './week1_ai_content';
   ```
3. Find the AI for Freelancers section (around line 240):
   ```typescript
   "00000000-0000-0000-0000-000000000001": [
   ```
4. Replace the existing modules array with:
   ```typescript
   "00000000-0000-0000-0000-000000000001": WEEK_1_AI_MODULES,
   ```

### Option 2: Add Week 1 as Additional Modules

If you want to keep existing content and add Week 1 at the beginning:

```typescript
"00000000-0000-0000-0000-000000000001": [
  ...WEEK_1_AI_MODULES,
  // ... existing modules
],
```

## Content Structure

### Module 1: Introduction to AI for Freelancing
- **Lesson 1.1:** What Is AI? (15 min)
- **Lesson 1.2:** Benefits of AI for Freelancers (18 min)
- **Lesson 1.3:** Limitations of AI (20 min)
- **Lesson 1.4:** Prompting Basics (25 min)
- **Lesson 1.5:** Real Examples of AI in Freelancing (22 min)
- **Quiz:** 5 questions testing understanding

### Module 2: AI for Social Media Marketing
- **Lesson 2.1:** Star9 Freelancer Account (20 min)
- **Lesson 2.2:** LinkedIn for Freelancers (25 min)
- **Lesson 2.3:** Facebook for Freelancers (22 min)
- **Lesson 2.4:** Twitter and X for Freelancers (20 min)
- **Lesson 2.5:** AI for Content Creation and Scheduling (30 min)
- **Quiz:** 5 questions testing understanding

## Key Features

✅ All content formatted in markdown with images  
✅ Interactive quizzes with explanations  
✅ Real-world examples and practical prompts  
✅ Tables for easy comparison  
✅ Proper TypeScript typing  
✅ Follows existing course structure pattern  

## Database Note

The SQL file `add_week1_ai_course.sql` was initially created but is **not needed**. The course content is managed entirely in the frontend through `useAcademyData.ts`, not in the database. The database only stores:
- Course metadata (title, description, price, etc.)
- User enrollment data
- User progress tracking

## Testing

After integration:
1. Start the development server
2. Navigate to the Academy page
3. Click on "AI for Freelancers" course
4. Verify Week 1 modules appear correctly
5. Test lesson navigation and quiz functionality

## Next Steps

To add Week 2, 3, and 4 content, follow the same pattern:
1. Create similar module structures
2. Add them to the modules array
3. Ensure lesson IDs are unique (e.g., `ai-w2-m1-l1` for Week 2)
