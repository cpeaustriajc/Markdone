import { Database } from '@/types/database.types'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export const supabaseClient = createPagesBrowserClient<Database>({
	supabaseUrl: process.env['NEXT_PUBLIC_SUPABASE_URL'],
	supabaseKey: process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
})
