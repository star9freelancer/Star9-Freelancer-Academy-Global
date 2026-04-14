-- Create resumes storage bucket
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

-- Allow authenticated users to upload their own resume
create policy "Users can upload own resume"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to read their own resume
create policy "Users can read own resume"
on storage.objects for select
to authenticated
using (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow admins to read all resumes
create policy "Admins can read all resumes"
on storage.objects for select
to authenticated
using (
  bucket_id = 'resumes'
  and exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);

-- Allow users to update (overwrite) their own resume
create policy "Users can update own resume"
on storage.objects for update
to authenticated
using (
  bucket_id = 'resumes'
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Add resume_url column to profiles if not exists
alter table public.profiles
add column if not exists resume_url text;
