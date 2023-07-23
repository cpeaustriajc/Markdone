import { Database } from '@/types/database.types'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabaseClient = createClientComponentClient<Database>({
	options: { global: { fetch: fetch.bind(globalThis) } },
})

export const getDraft = async (id: string) => {
	return await supabaseClient.from('drafts').select('*').eq('id', id).single()
}

export const getDrafts = async () => {
	return await supabaseClient.from('drafts').select('*')
}

type DraftsResponse = Awaited<ReturnType<typeof getDrafts>>
export type DraftsResponseSuccess = DraftsResponse['data']
export type DraftsResponseError = DraftsResponse['error']

type DraftResponse = Awaited<ReturnType<typeof getDraft>>
export type DraftResponseSuccess = DraftResponse['data']
export type DraftResponseError = DraftResponse['error']
