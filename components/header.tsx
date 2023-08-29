'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { Drawer } from '@/components/drawer'
import { NavigationMenuItem, NavigationMenuList, NavigationMenu } from '@/components/ui/navigation-menu'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { trpc } from '@/lib/trpc/client'
import { useState } from 'react'
import { Spinner } from './ui/spinner'
import { Skeleton } from './ui/skeleton'

export function Header({ id }: { id: string }) {
	const [filename, setFilename] = useState<string | undefined>('')
	const { refetch, isLoading: isDraftLoading } = trpc.getDraftById.useQuery(
		{ id },
		{
			onSuccess: data => {
				setFilename(data?.filename)
			},
		},
	)
	const { mutate, isLoading } = trpc.updateDraftFilename.useMutation({
		onSettled: () => {
			refetch()
		},
	})

	const TitleSkeleton = () => <Skeleton className="h-9 w-32 bg-secondary"></Skeleton>

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Drawer />
				<div className="flex gap-2">
					<div className="flex min-w-[128px] flex-row gap-2">
						{!isDraftLoading ? (
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
						) : (
							<TitleSkeleton />
						)}
						{isLoading ? <Spinner /> : <CheckCircledIcon className="h-9 w-9" />}
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
