'use client'

import { DraftsResponseError, DraftsResponseSuccess, getDrafts } from '@/lib/supabase'
import { useCallback, useEffect, useState } from 'react'

export function useFetchDrafts() {
	const [drafts, setDrafts] = useState<DraftsResponseSuccess>()
	const [error, setError] = useState<DraftsResponseError>()
	const [isLoading, setIsLoading] = useState(true)

	const getDraftsCallback = useCallback(getDrafts, [])

	useEffect(() => {
		const fetchDrafts = async () => {
			try {
				const { data, error } = await getDraftsCallback()
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
	}, [setDrafts, getDraftsCallback])

	return { drafts, isLoading, error }
}
