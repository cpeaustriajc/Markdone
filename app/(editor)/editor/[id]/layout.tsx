import { Header } from '@/components/header'
import { serverClient } from '@/lib/trpc/serverClient'
import { Suspense } from 'react'

type Props = { params: { id: string }; children: React.ReactNode }

export async function generateStaticParams() {
	const drafts = await serverClient.draft.list()

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export default async function Layout({ params, children }: Props) {
	const initialDraft = await serverClient.draft.byId({ id: params.id })

	return (
		<>
			<Suspense>
				<Header id={params.id} initialDraft={initialDraft} />
			</Suspense>
			{children}
		</>
	)
}
