'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon, FilePlusIcon, FileIcon, TrashIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { Fragment } from 'react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from './ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { SidebarLoadingSkeleton } from './sidebar-loading-skeleton'
import { useFetchDrafts } from '@/hooks/use-fetch-drafts'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export function Sidebar() {
	const { drafts, isLoading } = useFetchDrafts()
	const supabase = useSupabaseClient()

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost">
					<span className="sr-only">Open Menu</span> <HamburgerMenuIcon className="h-6 w-6" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="grid w-full gap-1.5">
					<Button
						className="justify-start text-left"
						onClick={async () => {
							const { error } = await supabase.from('drafts').insert({})
							if (error) {
								throw error
							}
						}}>
						<FilePlusIcon className="mr-2 h-4 w-4" /> Create New Draft
					</Button>
					<h2 className="text-lg font-semibold text-foreground">Drafts</h2>
					{isLoading || !drafts ? (
						<SidebarLoadingSkeleton />
					) : (
						drafts.map(draft => (
							<Fragment key={draft.id}>
								<Button className="justify-start text-left" variant="ghost" asChild>
									<Link
										href={`/drafts/${draft.id}`}
										className="items-center justify-between align-middle">
										<span className="flex">
											<FileIcon className="mr-2 inline h-4 w-4" /> {draft.filename}
										</span>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="ghost"
													className="h-fit rounded-full px-2 hover:bg-destructive">
													<TrashIcon className="h-4 w-4" />
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>Are you sure you want to delete the file?</DialogHeader>
												<DialogDescription>
													You will not be able to recover it.
												</DialogDescription>
												<div>
													<Button
														variant={'destructive'}
														onClick={async () => {
															const { error } = await supabase
																.from('drafts')
																.delete()
																.eq('id', draft.id)
															if (error) {
																throw error
															}
														}}>
														Yes, I am Sure
													</Button>
												</div>
											</DialogContent>
										</Dialog>
									</Link>
								</Button>
							</Fragment>
						))
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
