'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: VoidFunction }) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div>
			<h1>Something went wrong!</h1>
			<Button onClick={() => reset()}>Try Again</Button>
		</div>
	)
}
