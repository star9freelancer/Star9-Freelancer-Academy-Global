-- Run this in your Supabase SQL Editor
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'umuroyattani14@gmail.com'
  LIMIT 1
);
