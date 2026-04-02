-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  email text,
  role text check (role in ('admin', 'student', 'freelancer', 'employer')) default 'student',
  verification_status text check (verification_status in ('pending', 'verified', 'rejected')) default 'pending',
  social_media_accounts jsonb default '{}'::jsonb,
  payment_accounts jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);
create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Trigger to create profile when auth.user is created
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Documents Table
create table documents (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  document_type text check (document_type in ('resume', 'certificate')),
  file_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table documents enable row level security;

create policy "Users can view own documents" on documents
  for select using (auth.uid() = user_id);
create policy "Users can insert own documents" on documents
  for insert with check (auth.uid() = user_id);
create policy "Users can delete own documents" on documents
  for delete using (auth.uid() = user_id);


-- 3. Academy Table (Courses & Training)
create table academy_courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text check (category in ('Freelancing', 'AI for Freelancers', 'Corporate Training')),
  ai_tools_covered text[] default '{}',
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table academy_courses enable row level security;

create policy "Published courses are viewable by everyone" on academy_courses
  for select using (status = 'published');
create policy "Only admins can modify courses" on academy_courses
  for all using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );


-- 4. Global Table (Opportunities)
create table global_opportunities (
  id uuid default uuid_generate_v4() primary key,
  employer_name text not null,
  opportunity_category text check (opportunity_category in ('Remote Work', 'Work Abroad', 'Study Abroad')),
  description text,
  application_link text not null,
  status text check (status in ('open', 'closed')) default 'open',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table global_opportunities enable row level security;

create policy "Open opportunities viewable by everyone" on global_opportunities
  for select using (status = 'open');
create policy "Admins can modify opportunities" on global_opportunities
  for all using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );


-- 5. Invoices & Billing Table
create table invoices (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  amount numeric not null,
  status text check (status in ('paid', 'pending', 'cancelled')) default 'pending',
  course_id uuid references academy_courses(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table invoices enable row level security;

create policy "Users can view own invoices" on invoices
  for select using (auth.uid() = user_id);
create policy "Admins can view and manage all invoices" on invoices
  for all using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- Create Storage bucket for documents
insert into storage.buckets (id, name) values ('user-documents', 'user-documents') on conflict do nothing;
create policy "Users can upload their own documents" on storage.objects for insert with check (bucket_id = 'user-documents' and auth.uid() = owner);
create policy "Users can view their own documents" on storage.objects for select using (bucket_id = 'user-documents' and auth.uid() = owner);
