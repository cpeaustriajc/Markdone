import { Database } from '@/types/database.types'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export const supabaseClient = createClientComponentClient<Database>({
	options: { global: { fetch: fetch.bind(globalThis) } },
})

export const getDraft = async (id: string) => {
	return await supabaseClient.from('drafts').select('*').eq('id', id).single()
}

export function useFetchDraft(id: string) {
	const [draft, setDraft] = useState<DraftResponseSuccess>()
	const [error, setError] = useState<DraftResponseError>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchDraft = async () => {
			const { data, error } = await getDraft(id)
			setDraft(data)
			if (error) {
				setError(error)
			}
			setIsLoading(false)
		}

		fetchDraft()
	}, [setDraft, id, error])

	return { draft, isLoading, error }
}

export const getDrafts = async () => {
	return await supabaseClient.from('drafts').select('*')
}

export function useFetchDrafts() {
	const [drafts, setDrafts] = useState<DraftsResponseSuccess>()
	const [error, setError] = useState<DraftsResponseError>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchDrafts = async () => {
			const { data, error } = await getDrafts()
			setDrafts(data)
			if (error) {
				setError(error)
			}
			setIsLoading(false)
		}

		fetchDrafts()
	}, [setDrafts])

	return { drafts, isLoading, error }
}

type DraftsResponse = Awaited<ReturnType<typeof getDrafts>>
export type DraftsResponseSuccess = DraftsResponse['data']
export type DraftsResponseError = DraftsResponse['error']

type DraftResponse = Awaited<ReturnType<typeof getDraft>>
export type DraftResponseSuccess = DraftResponse['data']
export type DraftResponseError = DraftResponse['error']
