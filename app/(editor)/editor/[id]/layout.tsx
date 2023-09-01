import { Header } from '@/components/header'
import { prisma } from '@/lib/prisma'
import { Suspense } from 'react'

type Props = { params: { id: string }; children: React.ReactNode }

export async function generateStaticParams() {
	const drafts = await prisma.drafts.findMany()

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export default async function Layout({ params, children }: Props) {
	const initialDraft = await prisma.drafts.findUnique({ where: { id: params.id } })

	return (
		<>
			<Suspense>
				<Header id={params.id} initialDraft={initialDraft} />
			</Suspense>
			{children}
		</>
	)
}
