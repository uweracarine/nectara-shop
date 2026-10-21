// Client-side Supabase client
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { getSupabaseConfig } from '@/lib/supabase-config'

export function createClient() {
  const { url, anonKey } = getSupabaseConfig()

  if (!url || !anonKey || !url.includes('supabase.co')) {
    return null
  }

  return createBrowserClient<Database>(url, anonKey)
}
