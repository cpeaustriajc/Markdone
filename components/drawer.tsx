'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon, FilePlusIcon, FileIcon, TrashIcon, DownloadIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { SidebarLoadingSkeleton } from './sidebar-loading-skeleton'
import { inter } from '@/lib/fonts'
import { trpc } from '@/lib/trpc'
import { useRouter } from 'next/navigation'
import { downloadMarkdownFile } from '@/lib/utils'

export function Drawer() {
	const { data: drafts, refetch } = trpc.getDrafts.useQuery()
	const router = useRouter()

	const { mutate: createDraft, isLoading: isCreateDraftLoading } = trpc.createDraft.useMutation({
		onSettled: () => {
			refetch()
		},
	})

	const { mutate: deleteDraft } = trpc.deleteDraft.useMutation({
		onSettled: () => {
			refetch()
			router.replace('/')
		},
	})

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon">
					<span className="sr-only">Open Preferences</span>
					<HamburgerMenuIcon className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent className={inter.className} side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="grid w-full gap-1.5">
					<Button
						className="justify-start text-left"
						onClick={() => {
							createDraft()
						}}
						disabled={isCreateDraftLoading}
						type="button">
						<FilePlusIcon className="mr-2 h-4 w-4" /> Create New Draft
					</Button>
					<h2 className="text-lg font-semibold text-foreground">Drafts</h2>
					{drafts === null ? (
						<p>No drafts available</p>
					) : drafts === undefined ? (
						<SidebarLoadingSkeleton />
					) : (
						drafts.map(draft => (
							<div className="flex w-full flex-row" key={draft.id}>
								<Button className="grow justify-start text-left" variant="secondary" asChild>
									<Link
										href={`/editor/${draft.id}/`}
										className="rounded-br-none rounded-tr-none align-middle">
										<span className="inline-flex">
											<FileIcon className="mr-2 inline h-4 w-4" /> {draft.filename}
										</span>
									</Link>
								</Button>
								<Button
									variant="secondary"
									className="rounded-none px-2"
									onClick={() => {
										downloadMarkdownFile(draft)
									}}
									type="button">
									<DownloadIcon className="h-4 w-4" />
									<span className="sr-only">Download Draft</span>
								</Button>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="destructive" className="rounded-bl-none rounded-tl-none  px-2">
											<TrashIcon className="h-4 w-4" />
											<span className="sr-only">Delete Draft</span>
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>Are you sure you want to delete the file?</DialogHeader>
										<DialogDescription>You will not be able to recover it.</DialogDescription>
										<div>
											<Button
												variant="destructive"
												className={inter.className}
												onClick={() => {
													const { id } = draft
													deleteDraft({ id })
												}}>
												Yes, I am Sure
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						))
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
