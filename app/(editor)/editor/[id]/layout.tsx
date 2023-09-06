import { Header } from '@/components/header'
import { sql } from '@/lib/db'
import { unstable_cache } from 'next/cache'
import { Suspense } from 'react'

type Props = { params: { id: string }; children: React.ReactNode }

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

export default async function Layout({ params, children }: Props) {
	const getDraftById = unstable_cache(async ({ id }: { id: string }) => {
		return await sql`
			select *
			from drafts
			where id = ${id}
		`
	})

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
