'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon, FilePlusIcon, FileIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { SidebarLoadingSkeleton } from './sidebar-loading-skeleton'
import { inter } from '@/lib/fonts'
import { DownloadButton } from './download-button'
import { createDraft, deleteDraft } from '@/actions/draft'
import { useTransition } from 'react'
import useSWR, { Fetcher } from 'swr'
import { Drafts } from '@prisma/client'

const fetcher: Fetcher<Drafts[], string> = url => fetch(url).then(r => r.json())

export function Drawer() {
	const { data: drafts } = useSWR('/api/drafts', fetcher)
	let [isPending, startTransition] = useTransition()
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
						onClick={() => startTransition(() => createDraft())}
						disabled={isPending}
						type="button">
						<FilePlusIcon className="mr-2 h-4 w-4" /> Create New Draft
					</Button>
					<h2 className="text-lg font-semibold text-foreground">Drafts</h2>
					{!drafts ? (
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
								<DownloadButton draft={draft} />
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
											<Button variant={'destructive'} className={inter.className} onClick={() => startTransition(() => deleteDraft(draft.id))} disabled={isPending}>
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
