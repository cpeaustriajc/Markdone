import { Header } from '@/components/header'
import { prisma } from '@/lib/prisma'

type Props = { params: { id: string }; children: React.ReactNode }

export async function generateStaticParams() {
	const drafts = await prisma.drafts.findMany({ orderBy: { createdAt: 'desc' } })

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export default async function Layout({ params, children }: Props) {
	return (
		<>
			<Header id={params.id} />
			{children}
		</>
	)
}
