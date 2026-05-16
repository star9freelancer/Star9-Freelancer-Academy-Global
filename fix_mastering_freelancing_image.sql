-- Fix the image URL for Mastering Freelancing course
-- Using a professional workspace image without people

UPDATE academy_courses
SET image_url = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- Verify the update
SELECT 
    id,
    title,
    image_url
FROM academy_courses
WHERE id = '22222222-2222-2222-2222-222222222222';
