// Server-side Supabase client for protected operations
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { getSupabaseConfig, hasSupabaseConfig } from '@/lib/supabase-config'

interface CookieSetOptions {
  name: string
  value: string
  options?: Record<string, unknown>
}

export async function createClient() {
  const { url, anonKey } = getSupabaseConfig()

  if (!hasSupabaseConfig()) {
    return null
  }

  const cookieStore = await cookies()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: CookieSetOptions[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  })
}

export async function getServiceClient() {
  const { url, serviceKey } = getSupabaseConfig()

  if (!hasSupabaseConfig() || !serviceKey) {
    return null
  }

  return createServerClient<Database>(url, serviceKey, {
    cookies: {
      getAll() {
        return []
      },
      setAll() {
        // Service client doesn't need cookies
      },
    },
  })
}
