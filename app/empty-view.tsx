'use client'

import { trpc } from '@/lib/trpc/client'
import { Button } from '@/components/ui/button'

export function EmptyView() {
	const [, draftsQuery] = trpc.getDrafts.useSuspenseQuery()
	const draftMutation = trpc.createDraft.useMutation({
		onSuccess: () => {
			draftsQuery.refetch()
		},
	})

	return (
		<>
			<h1 className="scroll-m-20 text-center text-2xl font-semibold">
				You have no files open, <br />
				click on the menu to open a file
			</h1>
			<Button
				onClick={() => {
					draftMutation.mutate()
				}}
				disabled={draftMutation.isLoading}>
				New
			</Button>
		</>
	)
}
