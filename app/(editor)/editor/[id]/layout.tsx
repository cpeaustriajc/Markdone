import { Header } from '@/components/header'
import { Tables } from '@/lib/common.types';
import { Suspense } from 'react'

type Props = { params: { id: string }; children: React.ReactNode }

export async function generateStaticParams() {

	const res = await fetch("/api/drafts")

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	const drafts = await res.json() as Tables<'drafts'>[]

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export default async function Layout({ params, children }: Props) {
	const res = await fetch("/api/draft", {
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			id: params.id
		})
	})

	if (!res.ok) {
		throw new Error('Failed to fetch data')
	}

	const initialDraft = await res.json()

	return (
		<>
			<Suspense>
				<Header id={params.id} initialDraft={initialDraft} />
			</Suspense>
			{children}
		</>
	)
}
