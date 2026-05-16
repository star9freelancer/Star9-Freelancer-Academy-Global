# Step-by-Step Database Fix Guide

Follow these steps in order to fix the 406 error.

## Step 1: Check Current State

Run this script first to see what you currently have:

```sql
-- File: check_current_schema.sql
```

This will show you:
- ✓ If the table exists
- What columns are currently in the table
- Any existing data
- RLS status
- Current policies

## Step 2: Apply the Fix

Run this script to create/fix the table:

```sql
-- File: fix_user_enrollments_406.sql
```

This script is **safe to run multiple times**. It will:
- Create the table if it doesn't exist
- Add missing columns without breaking existing data
- Set up RLS policies
- Grant proper permissions
- Create performance indexes

## Step 3: Verify Everything Works

Run this script to confirm the fix:

```sql
-- File: verify_enrollments.sql
```

You should see:
- ✓ Table exists
- ✓ RLS is enabled
- ✓ Multiple RLS policies configured
- ✓ STATUS: All checks passed!

## Expected Results

### After Step 1 (check_current_schema.sql)

You might see:
- Table exists with basic columns (id, user_id, course_id, enrolled_at, progress)
- Or table doesn't exist at all
- Or table exists but missing some columns

### After Step 2 (fix_user_enrollments_406.sql)

You should see messages like:
```
✓ user_enrollments table fixed!
The 406 error should now be resolved.
```

And possibly:
```
Added column: completed_at
Added column: last_accessed_at
Added column: current_module_id
Added column: current_lesson_id
```

### After Step 3 (verify_enrollments.sql)

You should see:
```
========================================
VERIFICATION SUMMARY
========================================
✓ Table exists
✓ RLS is enabled
✓ 5 RLS policies configured
========================================
STATUS: All checks passed! ✓
```

## Troubleshooting

### If Step 1 shows "Table NOT FOUND"
- This is normal for a new setup
- Proceed to Step 2 to create the table

### If Step 2 fails with "relation does not exist"
- The `academy_courses` table might not exist
- Check if you have courses set up first
- Or temporarily remove the foreign key constraint

### If Step 3 shows "No RLS policies found"
- Re-run Step 2
- Check Supabase logs for any errors
- Verify you have permission to create policies

### If 406 error persists after all steps
1. Check the browser console for the exact error message
2. Verify your Supabase URL and anon key in `.env`
3. Check if the user is authenticated
4. Try logging out and back in
5. Clear browser cache and cookies

## After Database Fix

Once the database is fixed:

1. **Refresh your browser** (Ctrl+Shift+R or Cmd+Shift+R)
2. **Check the console** - should be clean, no 406 errors
3. **Test enrollment** - try enrolling in a course
4. **Check course cards** - should show enrollment status correctly

## What Each Script Does

### check_current_schema.sql
- **Purpose:** Diagnostic tool
- **Safe:** Yes, read-only
- **When:** Run first to understand current state

### fix_user_enrollments_406.sql
- **Purpose:** Creates/fixes the table and policies
- **Safe:** Yes, idempotent (safe to run multiple times)
- **When:** Run after checking current state

### verify_enrollments.sql
- **Purpose:** Confirms everything is working
- **Safe:** Yes, read-only with some notices
- **When:** Run after applying the fix

## Common Scenarios

### Scenario 1: Fresh Setup (No Table)
1. Run `check_current_schema.sql` → Shows "Table NOT FOUND"
2. Run `fix_user_enrollments_406.sql` → Creates everything
3. Run `verify_enrollments.sql` → Shows all checks passed

### Scenario 2: Table Exists But Missing Columns
1. Run `check_current_schema.sql` → Shows table with some columns
2. Run `fix_user_enrollments_406.sql` → Adds missing columns
3. Run `verify_enrollments.sql` → Shows all checks passed

### Scenario 3: Table Exists But No RLS
1. Run `check_current_schema.sql` → Shows RLS disabled
2. Run `fix_user_enrollments_406.sql` → Enables RLS and adds policies
3. Run `verify_enrollments.sql` → Shows all checks passed

## Success Indicators

✅ **Database is fixed when:**
- All 3 scripts run without errors
- verify_enrollments.sql shows "All checks passed!"
- Browser console shows no 406 errors
- Course cards display correctly
- Enrollment works properly

## Need Help?

If you're still seeing issues after following all steps:
1. Copy the error message from the browser console
2. Copy the output from `verify_enrollments.sql`
3. Check if there are any errors in Supabase logs
4. Verify your `.env` file has correct Supabase credentials
