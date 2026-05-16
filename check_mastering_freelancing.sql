-- Check the Mastering Freelancing course data
SELECT 
    id,
    title,
    slug,
    category,
    image_url,
    status,
    price,
    duration
FROM academy_courses
WHERE id = '22222222-2222-2222-2222-222222222222'
   OR slug = 'mastering-freelancing';

-- Check all columns in the academy_courses table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'academy_courses'
ORDER BY ordinal_position;
