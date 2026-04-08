const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.log("Missing env vars.");
  process.exit(1);
}

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('academy_lessons').select('title, video_url').limit(5);
  if (error) {
    console.error("Error fetching lessons:", error);
  } else {
    console.log("Current Videos in Database:");
    console.dir(data, { depth: null });
  }
}

check();
