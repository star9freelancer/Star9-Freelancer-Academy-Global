-- ============================================
-- Star9 Academy Reliability & Sync
-- Run this in Supabase SQL Editor
-- ============================================

-- A function that automatically creates a community group 
-- for any course that gets published.
CREATE OR REPLACE FUNCTION public.handle_new_course_group()
RETURNS TRIGGER AS $$
BEGIN
  -- We only want groups for published courses
  IF NEW.status = 'published' THEN
    -- Try to insert the group
    INSERT INTO public.chat_groups (name, type, course_id)
    VALUES (NEW.title, 'course', NEW.id)
    ON CONFLICT (course_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Whenever a course is updated (e.g. from draft to published)
-- or a new course is inserted directly as 'published'.
DROP TRIGGER IF EXISTS on_course_published ON public.academy_courses;
CREATE TRIGGER on_course_published
  AFTER INSERT OR UPDATE OF status ON public.academy_courses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_course_group();

-- CLEANUP/SYNC:
-- Ensure all currently published courses have their groups 
-- if they were missing due to manual seeding errors.
INSERT INTO public.chat_groups (name, type, course_id)
SELECT title, 'course', id FROM public.academy_courses WHERE status = 'published'
ON CONFLICT (course_id) DO NOTHING;
