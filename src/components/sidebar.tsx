'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon, FilePlusIcon, FileIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { SidebarLoadingSkeleton } from './sidebar-loading-skeleton'
import { useDeleteDraftMutation } from '@/hooks/use-delete-draft-mutation'
import { useCreateDraftMutation } from '@/hooks/use-create-draft-mutation'
import { useGetDraftsQuery } from '@/hooks/use-get-drafts-query'
import { useGetSessionQuery } from '@/hooks/use-get-session-query'

export function Sidebar() {
	const { data: sessionData, error: sessionError } = useGetSessionQuery()
	const { data: draftsData, isError, error: draftsError } = useGetDraftsQuery()
	const createDraftMutation = useCreateDraftMutation()
	const deleteDraftMutation = useDeleteDraftMutation()

	if (!sessionData) {
		throw new Error('Session is undefined')
	}

	if (sessionError) {
		throw new Error('Error while fetching session: ' + sessionError)
	}

	if (sessionData.session === null) {
		throw new Error('Session is null')
	}

	const user_id = sessionData.session.user.id

	if (isError) {
		throw new Error('Error while fetching drafts: ' + draftsError)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<span className="sr-only">Open Preferences</span>
					<HamburgerMenuIcon className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="grid w-full gap-1.5">
					<Button
						className="justify-start text-left"
						onClick={() => createDraftMutation.mutate({ filename: 'Untitled', content: '', user_id })}>
						<FilePlusIcon className="mr-2 h-4 w-4" /> Create New Draft
					</Button>
					<h2 className="text-lg font-semibold text-foreground">Drafts</h2>
					{draftsData ? (
						draftsData.map(draft => (
							<div className="flex w-full flex-row" key={draft.id}>
								<Button className="grow justify-start text-left" variant="secondary" asChild>
									<Link to={`/${draft.id}/`} className="rounded-br-none rounded-tr-none align-middle">
										<span className="inline-flex">
											<FileIcon className="mr-2 inline h-4 w-4" /> {draft.filename}
										</span>
									</Link>
								</Button>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="destructive" className="rounded-bl-none rounded-tl-none  px-2">
											<TrashIcon className="h-4 w-4" />
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>Are you sure you want to delete the file?</DialogHeader>
										<DialogDescription>You will not be able to recover it.</DialogDescription>
										<div>
											<Button
												variant={'destructive'}
												onClick={() => deleteDraftMutation.mutate(draft.id)}>
												Yes, I am Sure
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						))
					) : (
						<SidebarLoadingSkeleton />
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
