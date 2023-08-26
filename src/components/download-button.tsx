'use client'

import { Drafts } from "@prisma/client"
import { Button } from "./ui/button"
import { DownloadIcon } from "@radix-ui/react-icons"

export function DownloadButton({ draft}: { draft: Drafts}  ) {
	return (
		<Button
			variant="secondary"
			className="rounded-none px-2"
			onClick={() => {
				const a = document.createElement('a')
				const blob = new Blob([draft.content], { type: 'text/plain' })
				const url = URL.createObjectURL(blob)
				a.href = url
				a.download = `${draft.filename}.md`
				a.click()
				URL.revokeObjectURL(url)
				a.remove()
			}} type="button">
			<DownloadIcon className="h-4 w-4" />
			<span className="sr-only">Download Draft</span>
		</Button>
	)
}
