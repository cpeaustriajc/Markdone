'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { unstable_cache } from 'next/cache'
import { cookies } from 'next/headers'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

// Data fetching patterns with the cache function in Next.js
// Do not use in production.
export const unstable_getDrafts = unstable_cache(async () => {
	const supabase = createServerComponentClient({ cookies })
	const { data, error } = await supabase.from('drafts').select('*')

	return data
}, [], { tags: ['drafts'] })

export const unstasble_getDraftById = unstable_cache(async ({ id }: { id: string }) => {
	const supabase = createServerComponentClient({ cookies })

	const { data, error } = await supabase.from('drafts').select('*').eq('id', id).single()

	return data
}, [], { tags: ['draft'] })
