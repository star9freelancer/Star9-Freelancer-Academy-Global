-- ============================================
-- Star9 Community Chat Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Chat Groups (General + one per course)
CREATE TABLE IF NOT EXISTS chat_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('general', 'course')),
  course_id UUID REFERENCES academy_courses(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Group Membership
CREATE TABLE IF NOT EXISTS chat_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES chat_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (group_id, user_id)
);

-- 3. Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES chat_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 2000),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chat_messages_group ON chat_messages(group_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_members_user ON chat_members(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_members_group ON chat_members(group_id);

-- Seed the General group
INSERT INTO chat_groups (name, type) VALUES ('General', 'general')
ON CONFLICT DO NOTHING;

-- Create a course group for each existing published course
INSERT INTO chat_groups (name, type, course_id)
SELECT title, 'course', id FROM academy_courses WHERE status = 'published'
ON CONFLICT DO NOTHING;

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE chat_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Groups: anyone authenticated can read
CREATE POLICY "Authenticated users read groups"
  ON chat_groups FOR SELECT
  TO authenticated
  USING (true);

-- Members: users see their own memberships
CREATE POLICY "Users read own memberships"
  ON chat_members FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Members: users can join groups
CREATE POLICY "Users join groups"
  ON chat_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Messages: members can read messages in groups they belong to
CREATE POLICY "Members read group messages"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_members.group_id = chat_messages.group_id
      AND chat_members.user_id = auth.uid()
    )
  );

-- Messages: members can send messages to groups they belong to
CREATE POLICY "Members send messages"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_members.group_id = chat_messages.group_id
      AND chat_members.user_id = auth.uid()
    )
  );

-- Enable realtime on messages table
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
