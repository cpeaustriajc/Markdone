'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { Drawer } from '@/components/drawer'
import { NavigationMenuItem, NavigationMenuList, NavigationMenu } from '@/components/ui/navigation-menu'
import { CheckCircledIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { inter } from '@/lib/fonts'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from './ui/dialog'
import { ModeToggle } from './mode-toggle'
import useSWR from 'swr'
import { Drafts } from '@prisma/client'

const getDraft = async (url: string, id?: string): Promise<Drafts> => {
	const res = await fetch(`${url}?id=${id ?? '0'}`)

	return res.json()
}

export function Header({ id }: { id?: string }) {
	const { data: draft, error } = useSWR(['/api/draft', id], ([url, id]) => getDraft(url, id))

	if (error) {
		throw error
	}

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Drawer />
				<div className="flex gap-2">
					<div className="min-w-[128px]">
						<h1 className={`text-2xl font-bold ${inter.className}`}>{draft?.filename ?? 'Empty'}</h1>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button size="icon" variant="ghost" title="Edit Filename">
								<span className="sr-only">Edit Filename</span>
								<Pencil1Icon className="h-5 w-5" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<h2 className={`text-lg font-semibold text-foreground ${inter.className}`}>
									Edit Filename
								</h2>
							</DialogHeader>
							<div className={`flex flex-col gap-2 ${inter.className}`}>
								<Input
									type="text"
									className="rounded-md border border-foreground bg-background p-2"
									value={draft?.filename ?? 'Empty'}
								/>
							</div>
						</DialogContent>
					</Dialog>
					<Button size="icon" variant="ghost" title="Save Draft" onClick={() => {}}>
						<CheckCircledIcon className="h-5 w-5" />
						<span className="sr-only">Save</span>
					</Button>
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
