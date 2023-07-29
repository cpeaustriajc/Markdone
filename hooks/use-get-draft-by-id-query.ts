'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'
import { Database } from '@/types/database.types'

export function useGetDraftByIdQuery(id: string) {
	const client = useSupabaseClient<Database>()

	const getDraft = (id: string) => {
		return client.from('drafts').select('*').throwOnError().eq('id', id).single()
	}

	return useQuery({
		queryKey: ['drafts', id],
		queryFn: async () => {
			return getDraft(id).then(res => res.data)
		},
	})
}
