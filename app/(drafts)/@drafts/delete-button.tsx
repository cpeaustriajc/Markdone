'use client'

import { deleteDraft } from '@/app/_actions/draft'
import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import { useTransition } from 'react'

export function DeleteButton({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition()
	return (
		<Button
			variant="ghost"
			size="icon"
			type="submit"
			onClick={() => startTransition(() => deleteDraft(id))}
			disabled={isPending}>
			<TrashIcon />
			<span className="sr-only">Delete Draft</span>
		</Button>
	)
}
