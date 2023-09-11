'use client'

import { Button } from '@/components/ui/button'
import { downloadMarkdownFile } from '@/lib/utils'
import { DownloadIcon } from '@radix-ui/react-icons'
import { useTransition } from 'react'
import { Tables } from '@/lib/common.types'

export function DownloadButton({ draft }: { draft: Tables<'drafts'> }) {
	const [isPending, startTransition] = useTransition()
	return (
		<Button
			variant="ghost"
			size="icon"
			type="button"
			onClick={() => startTransition(() => downloadMarkdownFile(draft))}
			disabled={isPending}>
			<DownloadIcon className="h-4 w-4" />
			<span className="sr-only">Download Draft</span>
		</Button>
	)
}
