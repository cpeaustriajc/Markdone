import LegacyEditor from '@/components/legacy-editor'
import { useParams } from 'react-router-dom'

export default function DraftsPage() {
	const params = useParams()

	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row">
			<LegacyEditor id={params.id as string} />
		</main>
	)
}
