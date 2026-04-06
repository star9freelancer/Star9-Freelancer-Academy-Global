-- Patch to add Merit Points to User Profiles
-- Run this in Supabase SQL Editor

-- 1. Add merit_points column if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS merit_points INTEGER DEFAULT 0 CHECK (merit_points >= 0);

-- 2. Optional: Add a comment for documentation
COMMENT ON COLUMN profiles.merit_points IS 'Tracks student achievements and Network Merit within the Star9 Academy.';

-- 3. Initial sync: if you want to award points for existing enrollments (optional)
-- UPDATE profiles p
-- SET merit_points = (
--   SELECT count(*) * 10 FROM user_enrollments e WHERE e.user_id = p.id
-- )
-- WHERE id IN (SELECT user_id FROM user_enrollments);
