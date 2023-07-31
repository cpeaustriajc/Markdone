import { LoadingSkeleton } from '@/components/loading-skeleton'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row">
			<LoadingSkeleton />
			<Separator orientation="vertical" />
			<LoadingSkeleton />
		</main>
	)
}
