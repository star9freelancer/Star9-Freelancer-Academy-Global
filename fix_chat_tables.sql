-- Fix missing chat tables that are blocking enrollment and dashboard features
-- This ensures the Academy's social layer (Connect) works correctly

-- 1. Chat Groups Table
CREATE TABLE IF NOT EXISTS public.chat_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('general', 'course')),
    course_id UUID REFERENCES public.academy_courses(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Chat Members Table (Mapping users to groups)
CREATE TABLE IF NOT EXISTS public.chat_members (
    group_id UUID REFERENCES public.chat_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (group_id, user_id)
);

-- 3. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES public.chat_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- 4. Initial Policies (Allowing authenticated users to read and interact)
-- Group Access
CREATE POLICY "Anyone can view chat groups" ON public.chat_groups FOR SELECT TO authenticated USING (true);

-- Membership Access
CREATE POLICY "Users can view memberships" ON public.chat_members FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can join groups" ON public.chat_members FOR INSERT TO authenticated WITH CHECK (true);

-- Message Access
CREATE POLICY "Users can view messages" ON public.chat_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can send messages" ON public.chat_messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 5. Seed General Group if it doesn't exist
INSERT INTO public.chat_groups (name, type) 
SELECT 'General Discussion', 'general'
WHERE NOT EXISTS (SELECT 1 FROM public.chat_groups WHERE type = 'general');
