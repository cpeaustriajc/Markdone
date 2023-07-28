'use client'

import { Database } from '@/types/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

export function useDraftsQuery() {
	const client = useSupabaseClient<Database>()

	const getDrafts = () => {
		return client.from('drafts').select('*').throwOnError()
	}

	return useQuery({
		queryKey: ['drafts'],
		queryFn: async () => {
			return getDrafts().then(res => res.data)
		},
		suspense: true,
	})
}
