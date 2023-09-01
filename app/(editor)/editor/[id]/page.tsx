import { LegacyEditor } from '@/components/editor/legacy'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
	const drafts = await prisma.drafts.findMany()

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export async function generateMetadata({ params }: Props) {
	const id = params.id

	const draft = await prisma.drafts.findUnique({ where: { id } })

	if (!draft) {
		notFound()
	}

	return {
		title: draft.filename,
	}
}

export default function Editor({ params }: Props) {
	return (
		<>
			<main className="h-[calc(100%-4rem)] bg-background text-foreground">
				<div className="container relative flex	h-full flex-col md:flex-row">
					<LegacyEditor params={params} />
				</div>
			</main>
		</>
	)
}
