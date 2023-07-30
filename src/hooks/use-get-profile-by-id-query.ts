import { Database } from '@/types/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQuery } from '@tanstack/react-query'

export function useGetProfileByIdQuery(id: string) {
	const supabase = useSupabaseClient<Database>()

	const getProfileById = (id: string) => {
		return supabase.from('profiles').select('*').eq('id', id).single()
	}

	return useQuery({ queryKey: ['profile', id], queryFn: async () => getProfileById(id).then(res => res.data) })
}
