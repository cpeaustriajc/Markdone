import { Draft } from '@/lib/providers/editor'
import { Database } from '@/types/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'


export function useCreateDraftMutation() {
	const queryClient = useQueryClient()
	const supabase = useSupabaseClient<Database>()

	const createDraft = async (draft: Omit<Draft, 'id' | 'created_at'>) => {
		return supabase.from('drafts').insert(draft).single()
	}

	return useMutation({
		mutationFn: async (draft: Omit<Draft, 'id' | 'created_at'>) => {
			return createDraft(draft).then(res => res.data)
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['drafts'] })
		},
	})
}
