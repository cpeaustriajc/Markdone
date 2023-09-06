import { getDraftById, getDrafts } from '@/app/loaders'
import { Header } from '@/components/header'
import { Suspense } from 'react'

type Props = { params: { id: string }; children: React.ReactNode }

export async function generateStaticParams() {
	const drafts = await getDrafts()

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export default async function Layout({ params, children }: Props) {
	const initialDraft = await getDraftById({ id: params.id })

	return (
		<>
			<Suspense>
				<Header id={params.id} initialDraft={initialDraft} />
			</Suspense>
			{children}
		</>
	)
}
