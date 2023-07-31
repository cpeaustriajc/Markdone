import { Header } from '@/components/header'
import { LegacyEditor } from '@/components/legacy-editor'
import { Draft, useDrafts } from '@/lib/providers/drafts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Editor() {
	const router = useRouter()
	const { id } = router.query
	const [draft, setDraft] = useState<Partial<Draft>>({})

	useEffect(() => {
		const sessionStorageDrafts = JSON.parse(sessionStorage.getItem('markdone:drafts') as string) as Draft[]
		const sessionStorageDraft = sessionStorageDrafts.find(draft => draft.id === id) ?? {}

		setDraft(sessionStorageDraft)
	},[id])

	return (
		<>
			<Head>
				<title>Editor | {draft.filename}</title>
			</Head>
			<Header />
			<main className="flex h-full bg-background text-foreground">
				<LegacyEditor />
			</main>
		</>
	)
}
