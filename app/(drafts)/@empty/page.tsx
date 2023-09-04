'use client'

import { Button } from '@/components/ui/button'
import { createDraft } from '@/app/_actions/draft'
import { useTransition } from 'react'

export default function Page() {
	const [isPending, startTransition] = useTransition()
	return (
		<>
			<h1 className="w-52 scroll-m-20 text-center font-semibold">You have no files open</h1>
				<Button type="submit" className="w-52" onClick={() => startTransition(() => createDraft())} disabled={isPending}>
					New
				</Button>
		</>
	)
}
