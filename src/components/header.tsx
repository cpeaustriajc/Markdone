'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { NavigationSocials } from '@/components/navigation-socials'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export function Header() {
	const supabase = useSupabaseClient()
	const session = useSession()
	const clientQuery = useQueryClient()

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
					<NavigationMenuItem>
						{session ? (
							<Button
								onClick={() => {
									supabase.auth.signOut()
									clientQuery.refetchQueries(['drafts'])
								}}>
								Logout
							</Button>
						) : (
							<Button asChild>
								<Link to="/auth/login">Login</Link>
							</Button>
						)}
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
