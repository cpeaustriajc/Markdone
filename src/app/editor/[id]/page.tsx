'use client'

import { Header } from '@/components/header'
import { Draft } from '@/lib/providers/drafts'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const LegacyEditor = dynamic(() => import('@/components/editor/legacy').then(mod => mod.LegacyEditor), { ssr: false })

export default function Editor() {
	const params = useParams()
	const [draft, setDraft] = useState<Partial<Draft>>({})

	useEffect(() => {
		const sessionStorageDrafts = JSON.parse(sessionStorage.getItem('markdone:drafts') as string) as Draft[]
		const sessionStorageDraft = sessionStorageDrafts.find(draft => draft.id === params?.id) ?? {}

		setDraft(sessionStorageDraft)
		document.title = draft.filename ?? 'Untitled'
	}, [params?.id, draft.filename])

	return (
		<>
			<Header />
			<main className="h-[calc(100%-4rem)] bg-background text-foreground">
				<div className="container relative flex h-full">
					<LegacyEditor />
				</div>
			</main>
		</>
	)
}
