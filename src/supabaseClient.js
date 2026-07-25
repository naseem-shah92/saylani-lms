import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tnphzhydbzjosvcgkpvb.supabase.co'
const supabaseAnonKey = 'sb_publishable_LYw9V9YHVE-aD8eYhF7dOQ_ryH1YHci'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);