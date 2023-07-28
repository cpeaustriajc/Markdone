'use client'

import { getDraft } from '@/lib/queries/get-draft-by-id'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

export function useFetchDraft(id: string) {
	const client = useSupabaseClient()
	const key = ['draft', id, client]

	return useQuery({
		queryKey: key,
		queryFn: async () => {
			const res = await getDraft(client, id)
			return res.data
		},
	})
}
