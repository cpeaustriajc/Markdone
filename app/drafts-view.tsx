import { Button } from '@/components/ui/button'
import { DownloadIcon, FileIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/prisma'
import { Input } from '@/components/ui/input'
import { createDraft, deleteDraft } from './_actions/draft'

export async function DraftsView() {
	const drafts = await prisma.drafts.findMany()
	const DraftSkeleton = () => <Skeleton className="h-9 w-32 bg-secondary"></Skeleton>

	return (
		<>
			<div className="flex flex-col gap-4">
				<h1 className="scroll-m-20 text-2xl font-semibold">Drafts</h1>
				<ul className="space-y-2">
					{drafts.map(draft => (
						<Suspense fallback={<DraftSkeleton />} key={draft.id}>
							<li>
								<div className="flex flex-row gap-2">
									<Button asChild variant="ghost" className="pl-0">
										<Link href={`/editor/${draft.id}`}>
											<FileIcon className="mr-2 inline h-4 w-4" /> {draft.filename}
										</Link>
									</Button>
									<Button variant="ghost" size="icon" type="button">
										<DownloadIcon className="h-4 w-4" />
										<span className="sr-only">Download Draft</span>
									</Button>
									<form action={deleteDraft}>
										<Input id="id" name="id" className="hidden" value={draft.id} readOnly />
										<Button variant="ghost" size="icon" type="submit">
											<TrashIcon />
											<span className="sr-only">Delete Draft</span>
										</Button>
									</form>
								</div>
							</li>
						</Suspense>
					))}
				</ul>
				<form action={createDraft}>
					<Button>
						<PlusIcon className="mr-2 h-4 w-4" /> New
					</Button>
				</form>
			</div>
		</>
	)
}
