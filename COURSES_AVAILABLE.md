# Star9 Academy - Available Courses

## Summary
There are **2 courses** with complete content in the CURRICULUM_LEDGER:

---

## 1. AI for Freelancers
**Course ID:** `11111111-1111-1111-1111-111111111111`  
**Duration:** 4 Weeks  
**Price:** $50  
**Status:** ✅ Complete with all modules and lessons

### Modules (6 total):
1. **Module 1: Freelance Foundations (Basics)** - 5 lessons
2. **Module 2: The AI Revolution** - 4 lessons
3. **Module 3: Prompt Engineering Mastery** - 3 lessons
4. **Module 4: AI-Powered Service Delivery** - 6 lessons ⭐ (Updated with complete content)
5. **Module 5: Workflow Automation** - 6 lessons ⭐ (Updated with complete content)
6. **Module 6: Selling AI Services to Clients** - 6 lessons ⭐ (Updated with complete content)

**Total Lessons:** 30 lessons with videos, articles, quizzes, and interactive content

### Recent Updates (Weeks 2-4):
- ✅ Module 4: Added comprehensive content on AI for writing, design, research, coding, and video/audio
- ✅ Module 5: Added detailed workflow automation tutorials with step-by-step guides
- ✅ Module 6: Added complete sales frameworks, client acquisition strategies, and proposal templates
- ✅ All lessons now have video URLs
- ✅ Enhanced quizzes with more questions
- ✅ Added pricing guides and real-world examples

---

## 2. Mastering Freelancing
**Course ID:** `22222222-2222-2222-2222-222222222222`  
**Duration:** 6 Weeks  
**Price:** $100  
**Status:** ✅ Complete with all modules and lessons

### Modules (6 total):
1. **Module 1: Freelance Foundations (Basics)** - 5 lessons
2. **Module 2: The Sovereign Freelance Mindset** - 4 lessons
3. **Module 3: High-Ticket Profile & Personal Brand** - 4 lessons
4. **Module 4: Pricing & Pitching Like a Pro** - 5 lessons
5. **Module 5: Client Management & Delivery** - 4 lessons
6. **Module 6: Scaling — From Freelancer to Business** - 4 lessons

**Total Lessons:** 26 lessons with videos, articles, quizzes, and toolkits

---

## 3. International Teacher Preparation
**Course ID:** `33333333-3333-3333-3333-333333333333`  
**Duration:** 12 Weeks  
**Price:** $1,500  
**Status:** ⚠️ NOT in CURRICULUM_LEDGER (only database record exists)

**Note:** This course exists in the database but has NO content in the CURRICULUM_LEDGER. It will show "No modules found" error.

---

## Database Requirements

For courses to display properly, they need:

1. **Database Record** (in `academy_courses` table):
   - Basic course info (id, title, slug, category, status, etc.)
   
2. **Frontend Content** (in `CURRICULUM_LEDGER`):
   - Detailed modules, lessons, videos, quizzes, etc.

### Current Status:
- ✅ **AI for Freelancers**: Has both database record AND complete CURRICULUM_LEDGER content
- ✅ **Mastering Freelancing**: Has both database record AND complete CURRICULUM_LEDGER content  
- ⚠️ **International Teacher Preparation**: Has database record but NO CURRICULUM_LEDGER content

---

## How to Fix Missing Courses

If courses aren't showing:

1. **Run the SQL script:** `check_and_fix_courses.sql`
   - This ensures the database has the correct course IDs
   
2. **Verify in Supabase:**
   ```sql
   SELECT id, title, status FROM academy_courses;
   ```
   
3. **Check browser console** for debug messages:
   - `CourseDashboard Debug:` shows if course was found
   - `courseModules:` shows how many modules were loaded

---

## File Locations

- **Frontend Content:** `src/hooks/useAcademyData.ts` (CURRICULUM_LEDGER)
- **Database Schema:** `schema.sql`, `seed.sql`
- **Fix Scripts:** `check_and_fix_courses.sql`, `fix_missing_tables.sql`
