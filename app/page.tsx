import { DeleteButton } from '@/components/delete-button'
import { DownloadButton } from '@/components/download-button'
import { EmptyDrafts } from '@/components/empty-drafts'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { FileIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Page() {
	const drafts = await prisma.drafts.findMany()
	return drafts.length === 0 ? (
		<EmptyDrafts />
	) : (
		<main className="container flex h-[calc(100%-4rem)] flex-col bg-background font-sans text-foreground">
			<h1 className="scroll-m-20 text-2xl font-semibold">Drafts</h1>
			<ul>
				{drafts.map(draft => (
					<li key={draft.id}>
						<div className="flex flex-row">
							<Button asChild className="rounded-br-none rounded-tr-none shadow-none">
								<Link href={`/editor/${draft.id}`}>
									<FileIcon className="inline h-4 w-4" /> {draft.filename}
								</Link>
							</Button>
							<DownloadButton draft={draft} />
							<DeleteButton id={draft.id} />
						</div>
					</li>
				))}
			</ul>
		</main>
	)
}
