-- Run this in your Supabase SQL Editor to create the contact_messages table

create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table contact_messages enable row level security;

-- Allow anyone (including anonymous) to insert messages
create policy "Anyone can submit a contact message"
  on contact_messages for insert
  with check (true);

-- Only admins can read messages
create policy "Admins can read contact messages"
  on contact_messages for select
  using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- Only admins can update (mark as read)
create policy "Admins can update contact messages"
  on contact_messages for update
  using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );
