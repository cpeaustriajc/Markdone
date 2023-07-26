import { Database } from '@/types/database.types'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'

export const supabaseClient = createClientComponentClient<Database>()

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

export function useFetchDraft(id: string) {
	const [draft, setDraft] = useState<DraftResponseSuccess>()
	const [error, setError] = useState<DraftResponseError>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchDraft = async () => {
			try {
				const { data, error } = await getDraft(id)
				setDraft(data)
				if (error) {
					setError(error)
				}
			} catch (error) {
				throw error
			} finally {
				setIsLoading(false)
			}
		}

		fetchDraft()
	}, [setDraft, id, error])

	return { draft, isLoading, error }
}

export function useFetchDrafts() {
	const [drafts, setDrafts] = useState<DraftsResponseSuccess>()
	const [error, setError] = useState<DraftsResponseError>()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchDrafts = async () => {
			try {
				const { data, error } = await getDrafts()
				setDrafts(data)
				if (error) {
					setError(error)
				}
			} catch (error) {
				throw error
			} finally {
				setIsLoading(false)
			}
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
