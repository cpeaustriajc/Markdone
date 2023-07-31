'use client'

import LegacyEditor from '@/components/legacy-editor'
import { useParams } from 'next/navigation'

export default function DraftsPage() {
	const params = useParams()

	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row">
			<LegacyEditor id={params.id as string} />
		</main>
	)
}
