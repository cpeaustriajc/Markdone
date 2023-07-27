'use client'

import { DraftResponseError, DraftResponseSuccess, getDraft } from '@/lib/supabase'
import { useCallback, useEffect, useState } from 'react'

export function useFetchDraft(id: string) {
	const [draft, setDraft] = useState<DraftResponseSuccess>()
	const [error, setError] = useState<DraftResponseError>()
	const [isLoading, setIsLoading] = useState(true)

	const getDraftCallback = useCallback(getDraft, [id])

	useEffect(() => {
		const fetchDraft = async () => {
			try {
				const { data, error } = await getDraftCallback(id)
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
	}, [setDraft, id, error, getDraftCallback])

	return { draft, isLoading, error }
}
