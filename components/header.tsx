'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { Drawer } from '@/components/drawer'
import { NavigationMenuItem, NavigationMenuList, NavigationMenu } from '@/components/ui/navigation-menu'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { trpc } from '@/lib/trpc/client'
import { Suspense, useCallback, useState } from 'react'
import { Spinner } from './ui/spinner'
import { Skeleton } from './ui/skeleton'
import { serverClient } from '@/lib/trpc/serverClient'
import { UserButton } from '@clerk/nextjs'
import { debounce } from 'lodash'

type Props = {
	id: string
	initialDraft: Awaited<ReturnType<(typeof serverClient)['draft']['byId']>>
}

export function Header({ id, initialDraft }: Props) {
	const [draft, draftQuery] = trpc.draft.byId.useSuspenseQuery(
		{ id },
		{
			initialData: initialDraft,
			onSuccess: data => {
				setFilename(data?.filename)
			},
		},
	)
	const [filename, setFilename] = useState<string | undefined>('')
	const { mutate } = trpc.draft.updateFilename.useMutation({
		onSettled: () => {
			draftQuery.refetch()
		},
	})
	const mutation = debounce((filename) => {
		mutate({ id, filename })
	}, 1500)


	// eslint-disable-next-line react-hooks/exhaustive-deps
	const save = useCallback((filename: string) => mutation(filename), [])
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		save(e.target.value)
	}
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
								disabled={!draft}
								onChange={handleChange}
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
					<NavigationMenuItem>
						<UserButton />
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
