-- Patch to add Course Enrollments and Certificates

-- 1. Course Enrollments Table (Tracks learning progress)
create table if not exists course_enrollments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references academy_courses(id) on delete cascade not null,
  progress_percentage integer default 0 check (progress_percentage >= 0 and progress_percentage <= 100),
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- 2. Certificates Table (Stores achievements after completing a course)
create table if not exists certificates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references academy_courses(id) on delete cascade not null,
  credential_url text, -- Future URL to PDF or digital badge
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- Enable RLS for new tables
alter table course_enrollments enable row level security;
alter table certificates enable row level security;

-- Policies for Course Enrollments
create policy "Users can view own course enrollments" on course_enrollments
  for select using (auth.uid() = user_id);

create policy "Users can insert own course enrollments" on course_enrollments
  for insert with check (auth.uid() = user_id);

create policy "Users can update own course enrollments" on course_enrollments
  for update using (auth.uid() = user_id);

-- Policies for Certificates
create policy "Users can view own certificates" on certificates
  for select using (auth.uid() = user_id);

create policy "Users can insert own certificates" on certificates
  for insert with check (auth.uid() = user_id);
