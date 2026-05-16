# Week 3 Integration Instructions

## Quick Integration Guide

Follow these steps to add Week 3 content to the AI for Freelancers course.

## Step 1: Verify Week 3 Content File

The content file is located at:
```
Star9-Academy/src/hooks/week3_ai_content.ts
```

This file contains:
- Module 5: AI for Creating Websites (6 lessons + 1 quiz)
- Module 6: AI for Time Management (7 lessons + 1 quiz)

## Step 2: Update useAcademyData.ts

Open `Star9-Academy/src/hooks/useAcademyData.ts` and add the import at the top:

```typescript
import { week3Content } from './week3_ai_content';
```

## Step 3: Add Week 3 Modules to AI Course

Find the AI for Freelancers course definition and add Module 5 and Module 6 after the existing modules:

```typescript
// Inside the AI for Freelancers course object
{
  id: '00000000-0000-0000-0000-000000000001',
  title: 'AI for Freelancers',
  // ... existing properties
  
  // Add these modules after Week 2 modules
  modules: [
    // ... existing Week 1 modules (Module 1, Module 2)
    // ... existing Week 2 modules (Module 3, Module 4)
    
    // MODULE 5: AI for Creating Websites
    {
      moduleNumber: 5,
      title: 'AI for Creating Websites',
      estimatedTime: '3-4 hours',
      lessons: [
        ...week3Content.module5.lessons,
        week3Content.module5.quiz
      ]
    },
    
    // MODULE 6: AI for Time Management
    {
      moduleNumber: 6,
      title: 'AI for Time Management',
      estimatedTime: '2-3 hours',
      lessons: [
        ...week3Content.module6.lessons,
        week3Content.module6.quiz
      ]
    }
  ]
}
```

## Step 4: Update Course Metadata

Update the course overview to reflect the new totals:

```typescript
{
  // ... other properties
  duration: '17-23 hours', // was '12-16 hours'
  lessonsCount: 34, // was 21
  // Update description to mention 6 modules instead of 4
}
```

## Step 5: Test the Integration

### Manual Testing Checklist

- [ ] Navigate to the AI for Freelancers course
- [ ] Verify 6 modules are visible in the course outline
- [ ] Click on Module 5 and verify all 7 items load (6 lessons + 1 quiz)
- [ ] Click on Module 6 and verify all 8 items load (7 lessons + 1 quiz)
- [ ] Test lesson navigation (previous/next buttons)
- [ ] Complete Module 5 quiz and verify scoring
- [ ] Complete Module 6 quiz and verify scoring
- [ ] Check progress tracking updates correctly
- [ ] Verify images load on all lessons
- [ ] Test on mobile device

### Expected Results

**Module 5 Lessons:**
1. What Are AI Website Builders? (20:00)
2. Creating Your Website with Durable.co (30:00)
3. Generating Website Content with AI (25:00)
4. Simple Web Design Without Coding (20:00)
5. Publishing and Sharing Your Website (25:00)
6. Module 5: Practical Activities (50:00)
7. Module 5: Self-Assessment Quiz (10:00)

**Module 6 Lessons:**
1. Why Freelancers Need Time Management (18:00)
2. Creating Schedules and Timetables with AI (25:00)
3. Time Blocking for Deep Work (22:00)
4. Free Productivity Tools (20:00)
5. Managing Multiple Clients and Deadlines (25:00)
6. Avoiding Burnout with AI (25:00)
7. Module 6: Practical Activities (40:00)
8. Module 6: Self-Assessment Quiz (10:00)

## Step 6: Update Course Progress Calculation

Ensure the progress calculation accounts for all 34 lessons across 6 modules.

## Common Issues and Solutions

### Issue: Lessons not appearing
**Solution:** Check that the import statement is correct and week3_ai_content.ts is in the same directory as useAcademyData.ts

### Issue: Quiz not working
**Solution:** Verify the quiz structure matches the format used in Week 1 and Week 2 quizzes

### Issue: Images not loading
**Solution:** All images use Unsplash URLs. Check internet connection and verify URLs are accessible

### Issue: Progress not tracking
**Solution:** Ensure lesson IDs are unique and the progress tracking logic includes all 6 modules

## Verification Commands

After integration, you can verify the structure:

```typescript
// In browser console
console.log('Total modules:', course.modules.length); // Should be 6
console.log('Total lessons:', course.modules.reduce((sum, m) => sum + m.lessons.length, 0)); // Should be 34
```

## Rollback Plan

If issues occur, you can temporarily remove Week 3 by:
1. Commenting out the week3Content import
2. Removing Module 5 and Module 6 from the modules array
3. Reverting course metadata to previous values

## Success Criteria

✅ All 6 modules visible in course outline
✅ All 34 lessons accessible
✅ Both new quizzes functional
✅ Progress tracking works correctly
✅ Navigation between lessons works
✅ Images load properly
✅ Mobile responsive

## Next Steps After Integration

1. Update course marketing materials
2. Notify enrolled students about new content
3. Update course completion certificate
4. Consider adding Week 4 content (if planned)

## Support

If you encounter issues during integration, check:
- Browser console for errors
- Network tab for failed requests
- React DevTools for component state
- Database for progress tracking issues

---

**Integration Status:** Ready to implement
**Estimated Time:** 15-30 minutes
**Difficulty:** Easy (follows same pattern as Week 1 and Week 2)
