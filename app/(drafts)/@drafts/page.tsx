import { Button } from '@/components/ui/button'
import { FileIcon, PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { createDraft } from '@/app/_actions/draft'
import { DownloadButton } from './download-button'
import { DeleteButton } from './delete-button'
import { prisma } from '@/lib/prisma'

export default async function Page() {
	const drafts = await prisma.drafts.findMany()
	const DraftSkeleton = () => <Skeleton className="h-9 w-48 bg-secondary"></Skeleton>

	return (
		<div className="flex flex-col gap-4">
			<h1 className="scroll-m-20 text-2xl font-semibold">Drafts</h1>
			<ul className="space-y-2">
				{drafts?.map(draft => (
					<Suspense fallback={<DraftSkeleton />} key={draft.id}>
						<li>
							<div className="flex flex-row gap-2">
								<Button asChild variant="ghost" className="pl-0">
									<Link href={`/editor/${draft.id}`}>
										<FileIcon className="mr-2 inline h-4 w-4" /> {draft.filename}
									</Link>
								</Button>
								<DownloadButton draft={draft} />
								<DeleteButton id={draft.id} />
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
	)
}
