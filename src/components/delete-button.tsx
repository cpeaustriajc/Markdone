'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { trpc } from '@/lib/trpc'

export function DeleteButton({ id }: { id: string }) {
	const { refetch } = trpc.getDraftById.useQuery({ id })
	const draftMutation = trpc.deleteDraft.useMutation({
		onSettled: () => {
			refetch()
		},
	})

	const handleDelete = async () => {
		draftMutation.mutate({ id })
	}

	return (
		<Button
			className="rounded-none rounded-br rounded-tr shadow-none"
			variant="destructive"
			size="icon"
			onClick={handleDelete}
			disabled={draftMutation.isLoading}>
			<TrashIcon />
		</Button>
	)
}
