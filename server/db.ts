import { createClient } from '@supabase/supabase-js';
import * as schema from "@shared/schema";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_ANON_KEY must be set in your environment variables.",
  );
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Helper function to handle Supabase responses
export const handleSupabaseResponse = async <T>(
  response: { data: T | null; error: any }
): Promise<T> => {
  if (response.error) {
    throw new Error(response.error.message);
  }
  if (!response.data) {
    throw new Error('No data returned from Supabase');
  }
  return response.data;
};
