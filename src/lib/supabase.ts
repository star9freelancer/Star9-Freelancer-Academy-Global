import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing from .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
    }
  }
});

// Debug helper — remove in production
export const testConnection = async () => {
  const { data, error } = await supabase.from('academy_courses').select('count').single();
  if (error) {
    console.error('[Supabase] Connection test FAILED:', error.message, error.code);
  } else {
    console.log('[Supabase] Connection test OK:', data);
  }
};
