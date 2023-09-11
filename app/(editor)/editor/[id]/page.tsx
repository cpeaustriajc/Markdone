import { LegacyEditor } from '@/components/editor/legacy'
import { unstable_cache } from 'next/cache'
import { notFound } from 'next/navigation'

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
	const getDrafts = unstable_cache(async () => {
		return await sql`
			select *
			from drafts
		`
	})

	const drafts = await getDrafts()

	return drafts.map(draft => ({
		params: {
			id: draft.id,
		},
	}))
}

export async function generateMetadata({ params }: Props) {
	const id = params.id

	const getDraftById = unstable_cache(async ({ id }: { id: string }) => {
		return await sql`
			select *
			from drafts
			where id = ${id}
		`
	})

	const drafts = await getDraftById({ id })

	if (!drafts) {
		notFound()
	}

	return drafts.map(draft => ({
		title: draft.filename,
	}))
}

export default function Editor({ params }: Props) {
	return (
		<main className="h-[calc(100%-4rem)] bg-background text-foreground">
			<div className="container relative flex	h-full flex-col md:flex-row">
				<LegacyEditor params={params} />
			</div>
		</main>
	)
}
