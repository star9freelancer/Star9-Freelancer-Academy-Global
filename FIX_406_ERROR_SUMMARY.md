# Fix for 406 Not Acceptable Error & Infinite Re-render

## Problems Identified

### 1. 406 Not Acceptable Error
**Error:** `GET .../user_enrollments?select=course_id%2Cstatus&user_id=eq...&status=eq.active&limit=1 406 (Not Acceptable)`

**Root Cause:** 
- Supabase PostgREST is returning a 406 error, which typically means:
  - The `user_enrollments` table doesn't exist or has incorrect RLS policies
  - The table structure doesn't match what's expected
  - RLS policies are blocking the query

### 2. Infinite Re-render Loop
**Symptoms:**
- `[CourseCard] AI for Freelancers:` logging repeatedly
- Lock warning: `Lock "lock:sb-...-auth-token" was not released within 5000ms`

**Root Cause:**
- The `CourseCard` component was recalculating `isEnrolled`, `progress`, and `isLocked` on every render
- React Strict Mode in development causes double-mounting, which triggers auth lock issues
- No memoization of computed values

## Fixes Applied

### Fix 1: Added Query Caching & Error Logging
**File:** `src/hooks/useAcademyData.ts`

```typescript
const enrollmentsQuery = useQuery({
  queryKey: ["user_enrollments", user?.id],
  retry: 1,
  staleTime: 30000, // Cache for 30 seconds to prevent excessive re-fetching
  queryFn: async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from("user_enrollments")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error('[useAcademyData] Enrollment query error:', error);
      throw error;
    }
    return data || [];
  },
  enabled: !!user
});
```

**Benefits:**
- Reduces unnecessary API calls
- Better error visibility
- Prevents query spam

### Fix 2: Memoized CourseCard Computed Values
**File:** `src/components/academy/CourseCard.tsx`

```typescript
import { useMemo } from "react";

const CourseCard = ({ course, enrollment, onEnroll, onOpen }: CourseCardProps) => {
  const { isAdmin } = useAuth();
  
  // Memoize computed values to prevent unnecessary re-renders
  const isEnrolled = useMemo(() => !!enrollment || isAdmin, [enrollment, isAdmin]);
  const progress = useMemo(() => enrollment?.progress || 0, [enrollment?.progress]);
  const isLocked = useMemo(() => isEnrolled && !isAdmin && new Date() < COHORT_START, [isEnrolled, isAdmin]);
  
  // Removed console.log that was causing spam
```

**Benefits:**
- Prevents recalculation on every render
- Stops infinite loop
- Removes debug logging spam

### Fix 3: Database Schema Fix
**File:** `fix_user_enrollments_406.sql`

Run this SQL script in your Supabase SQL Editor to:
- Ensure `user_enrollments` table exists with correct structure
- Set up proper RLS policies
- Grant correct permissions
- Create performance indexes

## How to Apply Fixes

### Step 1: Code Changes (Already Applied ✓)
The TypeScript/React changes have been made to:
- `src/hooks/useAcademyData.ts`
- `src/components/academy/CourseCard.tsx`

### Step 2: Database Fix (Follow DATABASE_FIX_STEPS.md)

**Quick version:**
1. Open Supabase SQL Editor
2. Run `check_current_schema.sql` to see what you have
3. Run `fix_user_enrollments_406.sql` to apply the fix
4. Run `verify_enrollments.sql` to confirm it worked

**Detailed guide:** See `DATABASE_FIX_STEPS.md` for complete instructions

### Step 3: Clear Browser Cache
1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Step 4: Verify Fix
After applying all fixes, you should see:
- ✅ No more 406 errors in console
- ✅ No more infinite `[CourseCard]` logs
- ✅ No more lock warnings
- ✅ Courses load properly
- ✅ Enrollment status displays correctly

## Additional Notes

### React Strict Mode
The lock warning is partially caused by React Strict Mode in development, which intentionally double-mounts components. This is normal and won't happen in production. The memoization fixes prevent it from causing issues.

### Query Optimization
The `staleTime: 30000` means enrollment data is cached for 30 seconds. If you need real-time updates, you can reduce this value or add a manual refresh mechanism.

### RLS Policies
The SQL script creates policies that allow:
- Users to view/manage their own enrollments
- Admins to view/manage all enrollments
- Anonymous users to view enrollments (read-only)

Adjust these policies based on your security requirements.

## Troubleshooting

### If 406 error persists:
1. Check Supabase logs for detailed error messages
2. Verify the `user_enrollments` table exists: `SELECT * FROM user_enrollments LIMIT 1;`
3. Check RLS is enabled: `SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'user_enrollments';`
4. Verify your user has a valid session

### If infinite loop persists:
1. Check if `useAuth()` is being called multiple times in parent components
2. Verify no other components are triggering re-renders
3. Check React DevTools Profiler to identify render causes

### If enrollments don't show:
1. Verify data exists: `SELECT * FROM user_enrollments WHERE user_id = 'your-user-id';`
2. Check RLS policies allow your user to read the data
3. Verify the query in `useAcademyData.ts` is correct

## Success Indicators

You'll know everything is working when:
1. Console is clean (no 406 errors, no spam logs)
2. Course cards render once and stay stable
3. Enrollment badges show correctly
4. Progress bars display properly
5. No performance issues or lag
