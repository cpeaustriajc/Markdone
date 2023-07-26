import LegacyEditor from '@/components/legacy-editor'
import { getDrafts } from '@/lib/supabase'

export async function generateStaticParams() {
	const { data } = await getDrafts()

	if (!data) {
		throw new Error('No drafts found')
	}

	return data.map(data => ({
		id: data.id,
	}))
}

export default function DraftsPage() {
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row xl:border-x">
			<LegacyEditor />
		</main>
	)
}
