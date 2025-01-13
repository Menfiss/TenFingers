import { createBrowserClient } from '@supabase/ssr'
import { Database } from '../../src/types/supabase'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )
}