import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
let envContent = '';
try { envContent = fs.readFileSync(envPath, 'utf8'); } catch(e) {}
if (!envContent) {
  try { envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8'); } catch(e) {}
}

const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.*)/)?.[1]?.trim() || '';
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/)?.[1]?.trim() || '';

if(!supabaseUrl) {
  console.error("No supabase details");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const exactEmail = 'umuroyattani2@gmail.com';
  console.log("Looking up user:", exactEmail);
  const { data: users, error: errUser } = await supabase.from('profiles').select('id, email, full_name').eq('email', exactEmail);
  
  if (!users || users.length === 0) {
     console.error("User not found!");
     return;
  }
  const user = users[0];
  console.log("Found user:", user.id);

  let { data: enrollments } = await supabase.from('user_enrollments').select('*').eq('user_id', user.id);
  
  if (!enrollments || enrollments.length === 0) {
     console.log("User currently has no enrollments. Enrolling in the first course...");
     const { data: courses } = await supabase.from('academy_courses').select('id').limit(1);
     if(!courses || courses.length === 0) return console.log("No courses available");
     const courseId = courses[0].id;
     await supabase.from('user_enrollments').insert({ user_id: user.id, course_id: courseId, status: 'active' });
     const refetch = await supabase.from('user_enrollments').select('*').eq('user_id', user.id);
     enrollments = refetch.data;
  }

  const courseId = enrollments[0].course_id;
  console.log("Processing course completion for course:", courseId);

  const { data: modules } = await supabase.from('academy_modules').select('id').eq('course_id', courseId);
  const moduleIds = modules.map(m => m.id);
  
  const { data: lessons } = await supabase.from('academy_lessons').select('id').in('module_id', moduleIds);
  console.log(`Found ${lessons.length} lessons. Marking all as completed.`);

  let insertedCount = 0;
  for (const lesson of lessons) {
     const { error } = await supabase.from('user_lesson_progress').upsert({
        user_id: user.id,
        course_id: courseId,
        lesson_id: lesson.id,
        completed_at: new Date().toISOString()
     }, { onConflict: 'user_id,lesson_id' });
     if(!error) insertedCount++;
  }
  console.log(`Marked ${insertedCount}/${lessons.length} lessons complete.`);
  
  const certId = `CERT-${user.id.substring(0,6).toUpperCase()}-${courseId.substring(0,8).toUpperCase()}`;
  console.log("Issuing certificate ID:", certId);
  const { error: certError } = await supabase.from('user_certificates').upsert({
     user_id: user.id,
     course_id: courseId,
     credential_id: certId,
     issued_at: new Date().toISOString()
  }, { onConflict: 'user_id,course_id' });
  
  if (certError) console.error("Error issuing certificate:", certError);
  else console.log("Successfully issued certificate!");
}

run();
