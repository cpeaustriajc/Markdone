import { Database } from '@/types/database.types'
import { SupabaseClient } from '@supabase/supabase-js'

export const getDrafts = async (client: SupabaseClient<Database>) => {
	return await client.from('drafts').select('*')
}

type DraftsResponse = Awaited<ReturnType<typeof getDrafts>>
export type DraftsResponseSuccess = DraftsResponse['data']
export type DraftsResponseError = DraftsResponse['error']
