'use client'

import { getDrafts } from '@/lib/queries/get-drafts'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

export function useFetchDrafts() {
	const client = useSupabaseClient()

	return useQuery({
		queryKey: ['drafts', client],
		queryFn: async () => {
			const res = await getDrafts(client)
			return res.data
		},
	})
}
