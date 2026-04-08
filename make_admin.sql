-- Run this in your Supabase SQL Editor to elevate the user to an admin
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'umuroyattani14@gmail.com';
