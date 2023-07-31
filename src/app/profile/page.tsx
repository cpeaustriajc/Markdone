'use client'

import { ProfileSetup } from '@/components/profile-setup'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from '@supabase/auth-helpers-react'

export default function ProfilePage() {
	const session = useSession()

	if (!session) {
		return <ProfileLoadingSkeleton />
	}
	return (
		<div className="container mx-auto">
			<ProfileSetup session={session} />
		</div>
	)
}

function ProfileLoadingSkeleton() {
	return (
		<div className="container mx-auto space-y-2">
			<div className="space-y-1">
				<Skeleton className="h-4 w-48" />
				<Skeleton className="h-9 w-full" />
			</div>
			<div className="space-y-1">
				<Skeleton className="h-4 w-48" />

				<Skeleton className="h-9 w-full" />
			</div>
			<div className="space-y-1">
				<Skeleton className="h-4 w-48" />

				<Skeleton className="h-9 w-full" />
			</div>
			<div className="space-y-1">
				<Skeleton className="h-4 w-48" />

				<Skeleton className="h-9 w-full" />
			</div>

			<div>
				<Skeleton className="h-9 w-48" />
			</div>
		</div>
	)
}
