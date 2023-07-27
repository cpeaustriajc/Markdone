import LegacyEditor from '@/components/legacy-editor'
import { getDrafts } from '@/lib/supabase'

export async function generateStaticParams() {
	try {
		const { data, error } = await getDrafts()

		if (error) {
			throw error
		}

		return data.map(data => ({
			id: data.id,
		}))
	} catch (error) {
		throw error
	}
}

export default function DraftsPage() {
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row xl:border-x">
			<LegacyEditor />
		</main>
	)
}
