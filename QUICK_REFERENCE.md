# Quick Reference: Sequential Unlocking

## 🎯 Key Features

### ✅ What's Implemented
- Sequential lesson unlocking across entire course
- 80% quiz pass requirement
- Visual lock indicators
- Error messages for locked content
- Progress persistence (database + localStorage)
- Admin override access

### 🔒 Locking Rules
1. First lesson always unlocked
2. Each lesson requires previous lesson completion
3. Quiz lessons require 80% score (4/5 questions)
4. Failed quizzes must be retaken
5. No skipping ahead allowed

## 📁 Files Changed

| File | Action | Lines |
|------|--------|-------|
| `CourseDashboard.tsx` | Modified | ~1010, ~1065, ~1280 |
| `App.tsx` | Modified | Removed CoursePlayer |
| `CoursePlayer.tsx` | **DELETED** | - |

## 🎨 Visual States

| Icon | State | Description |
|------|-------|-------------|
| ✅ | Completed | Green checkmark |
| 🔒 | Locked | Lock icon + badge |
| ▶️ | Available | Play icon |
| 📋 | Quiz | Purple badge |

## 💬 Error Messages

```
"Complete the previous lesson first"
→ Lessons must be completed in order. Quizzes require 80% to pass.

"Complete this lesson first"
→ You must complete the current lesson before moving to the next one.

"Not Passed (80% required)"
→ You need at least 4 out of 5 correct to proceed.
```

## 🧪 Quick Test

```bash
# 1. Start course
✓ Lesson 1 unlocked

# 2. Try lesson 2
✗ Locked (error message)

# 3. Complete lesson 1
✓ Mark complete

# 4. Try lesson 2 again
✓ Now unlocked

# 5. Take quiz (answer 4/5)
✓ Auto-completes

# 6. Take quiz (answer 3/5)
✗ Must retake
```

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Lesson won't unlock | Complete previous lesson |
| Quiz won't submit | Answer all questions |
| Progress not saving | Check database/localStorage |
| All lessons locked | Check first lesson completion |

## 📊 Database

```sql
-- Check user progress
SELECT * FROM user_lesson_progress 
WHERE user_id = 'USER_ID' 
AND course_id = 'COURSE_ID';

-- Reset progress (testing)
DELETE FROM user_lesson_progress 
WHERE user_id = 'USER_ID';
```

## 🚀 Deployment Checklist

- [ ] Run `update_ai_course_overview.sql`
- [ ] Test sequential unlocking
- [ ] Test quiz pass (80%)
- [ ] Test quiz fail (<80%)
- [ ] Test error messages
- [ ] Test progress persistence
- [ ] Test admin access
- [ ] Deploy to production

## 📞 Support

**For Students:**
- Refresh page if lesson won't unlock
- Ensure previous lesson is complete
- Check quiz score (need 80%)

**For Admins:**
- Full access to all content
- No locking restrictions
- Can review any lesson

## 🎓 Course Flow

```
Week 1 → Week 2 → Week 3
  ↓        ↓        ↓
Mod 1    Mod 3    Mod 5
  ↓        ↓        ↓
Mod 2    Mod 4    Mod 6
  ↓        ↓        ↓
Quiz     Quiz     Quiz
(80%)    (80%)    (80%)
```

## 📈 Success Metrics

Track:
- Completion rate
- Quiz pass rate
- Average time to complete
- Drop-off points
- Retake frequency

---

**Last Updated:** May 2026
**Version:** 1.0
**Status:** ✅ Production Ready
