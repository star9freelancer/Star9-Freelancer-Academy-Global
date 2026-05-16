# Fix 406 Error - Quick Guide

## The Problem
- ❌ 406 Not Acceptable errors in console
- ❌ Infinite `[CourseCard]` logging
- ❌ Lock warnings from Supabase auth

## The Solution

### Option 1: Quick Fix (Recommended)
Just run this one script in Supabase SQL Editor:
```
QUICK_FIX.sql
```
Then refresh your browser. Done!

### Option 2: Detailed Fix (If you want to understand what's happening)
Follow the step-by-step guide:
```
DATABASE_FIX_STEPS.md
```

## Files Overview

| File | Purpose | When to Use |
|------|---------|-------------|
| `QUICK_FIX.sql` | ⚡ Fast fix, run once | Start here |
| `check_current_schema.sql` | 🔍 See what you have | Diagnostic |
| `fix_user_enrollments_406.sql` | 🔧 Complete fix | Detailed setup |
| `verify_enrollments.sql` | ✅ Confirm it works | After fixing |
| `DATABASE_FIX_STEPS.md` | 📖 Step-by-step guide | Need help |
| `FIX_406_ERROR_SUMMARY.md` | 📚 Full documentation | Deep dive |

## Quick Start

1. **Open Supabase Dashboard** → SQL Editor
2. **Copy & paste** `QUICK_FIX.sql`
3. **Click Run**
4. **Refresh browser** (Ctrl+Shift+R)
5. **Done!** ✓

## What Was Fixed

### Code Changes (Already Applied)
- ✅ Added query caching to prevent spam
- ✅ Memoized CourseCard values
- ✅ Removed debug console logs

### Database Changes (You Need to Run)
- 🔧 Creates `user_enrollments` table
- 🔧 Sets up RLS policies
- 🔧 Grants proper permissions
- 🔧 Adds performance indexes

## After Running the Fix

You should see:
- ✅ No 406 errors in console
- ✅ No infinite logging
- ✅ No lock warnings
- ✅ Courses load properly
- ✅ Enrollment works

## Still Having Issues?

1. Check `verify_enrollments.sql` output
2. Look at browser console for specific errors
3. Verify `.env` has correct Supabase credentials
4. Try logging out and back in
5. Check `DATABASE_FIX_STEPS.md` for troubleshooting

## Need More Help?

- **Quick fix not working?** → Try the detailed fix in `DATABASE_FIX_STEPS.md`
- **Want to understand the issue?** → Read `FIX_406_ERROR_SUMMARY.md`
- **Database errors?** → Run `check_current_schema.sql` first
- **Still stuck?** → Check Supabase logs for detailed error messages
