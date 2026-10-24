// Import the createClient function from Supabase so we can connect our app
import { createClient } from '@supabase/supabase-js';

// Get our Supabase project URL and public Anon key from Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create and export our main Supabase client to use across all our feature services
export const supabase = createClient(supabaseUrl, supabaseAnonKey);