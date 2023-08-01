'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { Sidebar } from '@/components/sidebar'
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import dynamic from 'next/dynamic'

const ModeToggle = dynamic(()=> import('./mode-toggle').then(mod => mod.ModeToggle), { ssr: false })

export function Header() {
	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Sidebar />
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
