import { Database } from '@/types/database.types'
import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export const getDrafts = async () => {
	try {
		return await supabaseClient.from('drafts').select('*')
	} catch (error) {
		throw error
	}
}

export const getDraft = async (id: string) => {
	try {
		return await supabaseClient.from('drafts').select('*').eq('id', id).single()
	} catch (error) {
		throw error
	}
}

type DraftsResponse = Awaited<ReturnType<typeof getDrafts>>
export type DraftsResponseSuccess = DraftsResponse['data']
export type DraftsResponseError = DraftsResponse['error']

type DraftResponse = Awaited<ReturnType<typeof getDraft>>
export type DraftResponseSuccess = DraftResponse['data']
export type DraftResponseError = DraftResponse['error']
