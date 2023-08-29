import { Header } from '@/components/header'
import { serverClient } from '@/lib/trpc/serverClient'

type Props = { params: { id: string }; children: React.ReactNode }

export async function generateStaticParams() {
	const drafts = await serverClient.getDrafts()

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export default async function Layout({ params, children }: Props) {
	const initialDraft = await serverClient.getDraftById({ id: params.id })

	return (
		<>
			<Header id={params.id} initialDraft={initialDraft} />
			{children}
		</>
	)
}
