'use client'

import { trpc } from '@/lib/trpc/client'
import { Button } from './ui/button'

export function EmptyDrafts() {
	const { refetch } = trpc.getDrafts.useQuery()
	const draftMutation = trpc.createDraft.useMutation({
		onSuccess: () => {
			refetch()
		},
	})

	const handleCreate = () => {
		draftMutation.mutate()
	}

	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-4 bg-background font-sans text-foreground">
			<h1 className="scroll-m-20 text-center text-2xl font-semibold">
				You have no files open, <br />
				click on the menu to open a file
			</h1>
			<Button onClick={handleCreate} disabled={draftMutation.isLoading}>
				Click here to create a file
			</Button>
		</main>
	)
}
