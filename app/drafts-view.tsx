'use client'

import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc'
import { downloadMarkdownFile } from '@/lib/utils'
import { DownloadIcon, FileIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function DraftsView() {
	const { data: drafts, refetch } = trpc.getDrafts.useQuery()
	const router = useRouter()
	const { mutate: createDraft, isLoading: isCreateDraftLoading } = trpc.createDraft.useMutation({
		onSettled: () => {
			refetch()
			router.refresh()
		},
	})
	const { mutate: deleteDraft, isLoading: isDeleteDraftLoading } = trpc.deleteDraft.useMutation({
		onSettled: () => {
			refetch()
			router.refresh()
		},
	})

	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col items-center justify-center bg-background font-sans text-foreground">
			<div className="flex flex-col gap-4">
				<h1 className="scroll-m-20 text-2xl font-semibold">Drafts</h1>
				<ul className="space-y-2">
					{drafts?.map(draft => (
						<li key={draft.id}>
							<div className="flex flex-row gap-2">
								<Button asChild variant="ghost" className="pl-0">
									<Link href={`/editor/${draft.id}`}>
										<FileIcon className="mr-2 inline h-4 w-4" /> {draft.filename}
									</Link>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										downloadMarkdownFile(draft)
									}}
									type="button">
									<DownloadIcon className="h-4 w-4" />
									<span className="sr-only">Download Draft</span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => {
										deleteDraft({ id: draft.id })
									}}
									disabled={isDeleteDraftLoading}>
									<TrashIcon />
									<span className="sr-only">Delete Draft</span>
								</Button>
							</div>
						</li>
					))}
				</ul>
				<Button
					onClick={() => {
						createDraft()
					}}
					disabled={isCreateDraftLoading}>
					<PlusIcon className="mr-2 h-4 w-4" /> New
				</Button>
			</div>
		</main>
	)
}
