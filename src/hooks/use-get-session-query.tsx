import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export function useGetSessionQuery() {
	return useQuery({
		queryKey: ['session'],
		queryFn: async () => {
			const session = await supabase.auth.getSession()
			return session.data
		},
	})
}
