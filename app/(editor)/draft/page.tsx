import LegacyEditor from '@/components/legacy-editor'

export default function DraftsPage() {
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row xl:border-x">
			<LegacyEditor />
		</main>
	)
}
