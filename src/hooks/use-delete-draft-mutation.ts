import { Draft } from '@/lib/providers/drafts'
import { Database } from '@/types/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'


export function useDeleteDraftMutation() {
	const supabase = useSupabaseClient<Database>()
	const queryClient = useQueryClient()
	const router = useRouter()

	const deleteDraft = async (id: Draft['id']) => {
		return supabase.from('drafts').delete().match({ id }).single()
	}

	return useMutation({
		mutationFn: async (id: Draft['id']) => {
			return deleteDraft(id).then(res => res.data)
		},
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['drafts'] })
			router.push('/')
		},
	})
}
