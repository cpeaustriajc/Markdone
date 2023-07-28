'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { NavigationSocials } from '@/components/navigation-socials'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'

export function Header() {
	const supabase = useSupabaseClient()
	const session = useSession()

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row gap-2">
				<Sidebar />
			</div>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationSocials />
					<NavigationMenuItem>
						<ModeToggle />
					</NavigationMenuItem>
					<NavigationMenuItem>
						{session ? (
							<Button onClick={() => supabase.auth.signOut()}>Logout</Button>
						) : (
							<Button asChild>
								<Link href="/auth/login">Login</Link>
							</Button>
						)}
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
