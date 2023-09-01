'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { NavigationMenuItem, NavigationMenuList, NavigationMenu } from '@/components/ui/navigation-menu'
import { HomeIcon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { trpc } from '@/lib/trpc/client'
import { useCallback, useState } from 'react'
import { serverClient } from '@/lib/trpc/serverClient'
import { UserButton } from '@clerk/nextjs'
import { debounce } from 'lodash'
import Link from 'next/link'

type Props = {
	id: string
	initialDraft: Awaited<ReturnType<(typeof serverClient)['draft']['byId']>>
}

export function Header({ id, initialDraft }: Props) {
	const [filename, setFilename] = useState<string | undefined>('')
	const { refetch } = trpc.draft.byId.useQuery(
		{ id },
		{
			initialData: initialDraft,
			onSuccess: data => {
				setFilename(data?.filename)
			},
		},
	)
	const { mutate, isLoading } = trpc.draft.updateFilename.useMutation({
		onSettled: () => {
			refetch()
		},
	})
	const mutation = debounce(filename => {
		mutate({ id, filename })
	}, 1500)

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const save = useCallback((filename: string) => mutation(filename), [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilename(e.target.value)
		save(e.target.value)
	}

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Link href="/">
					<HomeIcon className="h-8 w-8" />
				</Link>
				<div className="flex gap-2">
					<div className="flex min-w-[128px] flex-row gap-2">
						<Input
							type="text"
							className="max-w-fit rounded-md border-none bg-background p-2 text-2xl font-bold focus-visible:ring-0"
							value={filename}
							disabled={isLoading}
							onChange={handleChange}
						/>
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
