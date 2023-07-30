import { Database } from '@/types/database.types'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useMutation } from '@tanstack/react-query'

export function useUpdateDraftMutation() {
	const supabase = useSupabaseClient<Database>()

	const updateDraft = async (params: { id: string; content?: string; filename?: string }) => {
		return supabase.from('drafts').update(params).eq('id', params.id).select<string>('content').single()
	}

	return useMutation<unknown, Awaited<ReturnType<typeof updateDraft>>['error'], { id: string; content?: string, filename?: string }>({
		mutationFn: async params => {
			return updateDraft({ id: params.id, content: params.content, filename: params.filename }).then(res => res.data)
		},
	})
}
