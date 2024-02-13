import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
	return (
		<div className="shrink-0 grow-0 basis-1/2 space-y-2 px-2">
			<Skeleton className="h-4 w-[500px]" />
			<Skeleton className="h-4 w-[250px]" />
		</div>
	);
}
