-- Consolidation Script for Star9 Platform Maturity
-- Unifying Job Tables and ensuring Community Infrastructure

-- 1. Academy Jobs Table (Unified)
CREATE TABLE IF NOT EXISTS public.academy_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    description TEXT,
    location TEXT DEFAULT 'Remote',
    salary_range TEXT,
    type TEXT DEFAULT 'Freelance',
    requirements TEXT[],
    application_url TEXT,
    is_active BOOLEAN DEFAULT true,
    posted_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Migrate data from global_opportunities if it exists
DO $$ 
BEGIN 
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'global_opportunities') THEN
        INSERT INTO public.academy_jobs (title, company, description, location, type, application_url, is_active, posted_at)
        SELECT 'Remote Opportunity', employer_name, 'No description provided', 'Remote', opportunity_category, application_link, (status = 'open'), created_at
        FROM public.global_opportunities
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

-- 3. Ensure Chat Group Consistency
-- Every course should have a chat group
INSERT INTO public.chat_groups (name, type, course_id)
SELECT title, 'course', id
FROM public.academy_courses
WHERE id NOT IN (SELECT course_id FROM public.chat_groups WHERE course_id IS NOT NULL);

-- Ensure General Discussion exists
INSERT INTO public.chat_groups (name, type)
SELECT 'General Discussion', 'general'
WHERE NOT EXISTS (SELECT 1 FROM public.chat_groups WHERE type = 'general');

-- 4. RLS for Academy Jobs
ALTER TABLE public.academy_jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active jobs" ON public.academy_jobs FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Admins can manage jobs" ON public.academy_jobs FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
