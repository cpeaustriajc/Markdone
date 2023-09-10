// Data fetching patterns with the cache function in Next.js
// Do not use in production.

import { sql } from '@/lib/db'
import { unstable_cache } from 'next/cache'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

type Draft = Database['public']['Tables']['drafts']['Row']

export const getDrafts = unstable_cache(async () => {
	return await sql<Draft[]>`
		select *
		from drafts
	`
})

export const getDraftById = unstable_cache(async ({ id }: { id: string }) => {
	return await sql`
		select *
		from drafts
		where id = ${id}
	`
})
