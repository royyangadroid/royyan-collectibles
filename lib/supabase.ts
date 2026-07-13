// ================================================
// lib/supabase.ts — Supabase Client (STANDBY)
//
// File ini sudah siap untuk digunakan ketika kita
// memindahkan data dari dummy ke Supabase.
// Saat ini TIDAK diimpor oleh file manapun.
// ================================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
