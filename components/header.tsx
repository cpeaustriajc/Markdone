'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { Drawer } from '@/components/drawer'
import { NavigationMenuItem, NavigationMenuList, NavigationMenu } from '@/components/ui/navigation-menu'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { trpc } from '@/lib/trpc/client'
import { Suspense, useState } from 'react'
import { Spinner } from './ui/spinner'
import { Skeleton } from './ui/skeleton'
import { serverClient } from '@/lib/trpc/serverClient'

type Props = {
	id: string
	initialDraft: Awaited<ReturnType<(typeof serverClient)['getDraftById']>>
}

export function Header({ id, initialDraft }: Props) {
	const [filename, setFilename] = useState<string | undefined>('')
	const [,draftQuery] = trpc.getDraftById.useSuspenseQuery(
		{ id },
		{
			initialData: initialDraft,
			onSuccess: data => {
				setFilename(data?.filename)
			},
		},
	)
	const { mutate } = trpc.updateDraftFilename.useMutation({
		onSettled: () => {
			draftQuery.refetch()
		},
	})

	const TitleSkeleton = () => <Skeleton className="h-9 w-32 bg-secondary"></Skeleton>

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Drawer />
				<div className="flex gap-2">
					<div className="flex min-w-[128px] flex-row gap-2">
						<Suspense fallback={<TitleSkeleton />}>
							<Input
								type="text"
								className="max-w-fit rounded-md border-none bg-background p-2 text-2xl font-bold"
								value={filename}
								onChange={e => {
									setFilename(e.target.value)
									setTimeout(() => {
										mutate({ id, filename: e.target.value })
									}, 1000)
								}}
							/>
						</Suspense>
						<Suspense fallback={<Spinner />}>
							<CheckCircledIcon className="h-9 w-9" />
						</Suspense>
					</div>
				</div>
			</div>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationSocials />
					<NavigationMenuItem>
						<ModeToggle />
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
