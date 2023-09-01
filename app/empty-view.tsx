'use client'

import { trpc } from '@/lib/trpc/client'
import { Button } from '@/components/ui/button'

export function EmptyView() {
	const { refetch } = trpc.draft.list.useQuery()
	const draftMutation = trpc.draft.create.useMutation({
		onSuccess: () => {
			refetch()
		},
	})

	return (
		<>
			<h1 className="w-52 scroll-m-20 text-center font-semibold">You have no files open</h1>
			<Button
				onClick={() => {
					draftMutation.mutate()
				}}
				disabled={draftMutation.isLoading}
				className="w-52">
				New
			</Button>
		</>
	)
}
