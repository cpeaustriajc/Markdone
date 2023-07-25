import { Skeleton } from './ui/skeleton'

export function SidebarLoadingSkeleton() {
	return (
		<div className="space-y-2 px-2">
			<Skeleton className="h-4 w-1/2" />
			<Skeleton className="h-4 w-1/2" />
			<Skeleton className="h-4 w-1/2" />
			<Skeleton className="h-4 w-1/2" />
		</div>
	)
}
