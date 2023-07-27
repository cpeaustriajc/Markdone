import { Database } from '@/types/database.types'
import { SupabaseClient } from '@supabase/auth-helpers-react'

export const getDraft = async (client: SupabaseClient<Database>, id: string) => {
	return await client.from('drafts').select('*').eq('id', id).single()
}

type DraftResponse = Awaited<ReturnType<typeof getDraft>>
export type DraftResponseSuccess = DraftResponse['data']
export type DraftResponseError = DraftResponse['error']
