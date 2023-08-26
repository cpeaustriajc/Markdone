import { Header } from '@/components/header'
import { prisma } from '@/lib/prisma'
import { LegacyEditor } from '@/components/editor/legacy'

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
	const drafts = await prisma.drafts.findMany({ orderBy: { createdAt: 'desc' } })

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export async function generateMetadata({ params }: Props) {
	const id = params.id

	// @ts-ignore Type 'string' is not assignable to type 'number'. But the actual required type of the value is a string?
	const draft = await prisma.drafts.findUnique({ where: { id }, select: { filename: true } })

	return {
		title: draft?.filename,
	}
}

export default function Editor({ params }: Props) {
	return (
		<>
			<Header id={params.id} />
			<main className="h-[calc(100%-4rem)] bg-background text-foreground">
				<div className="container relative flex	h-full md:flex-row flex-col">
					<LegacyEditor />
				</div>
			</main>
		</>
	)
}
