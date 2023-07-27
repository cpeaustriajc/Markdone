'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { GitHubLogoIcon, MoonIcon, SunIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Sidebar } from './sidebar'
import { Button } from './ui/button'
import Link from 'next/link'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import { NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

export function Header() {
	const { setTheme } = useTheme()
	const supabase = useSupabaseClient()
	const session = useSession()

	return (
		<NavigationMenu asChild>
			<header>
				<NavigationMenuList className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
					<NavigationMenuItem>
						<Sidebar />
					</NavigationMenuItem>
					<NavigationMenuItem>
						<div className="inline-flex space-x-2">
							<Button asChild variant="ghost" size="icon">
								<Link href="https://github.com/jaycedotbin/markdone" target="_blank">
									<span className="sr-only">View on GitHub</span>
									<GitHubLogoIcon className="h-5 w-5" />
								</Link>
							</Button>
							<Button asChild variant="ghost" size="icon">
								<Link href="https://twitter.com/jaycedotbin" target="_blank">
									<span className="sr-only">Follow me on twitter for updates</span>
									<TwitterLogoIcon className="h-5 w-5" />
								</Link>
							</Button>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<span className="sr-only">Toggle theme</span>
										<SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
										<MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
									<DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							{session ? (
								<Button onClick={() => supabase.auth.signOut()}>Logout</Button>
							) : (
								<Button asChild>
									<Link href="/auth/login">Login</Link>
								</Button>
							)}
						</div>
					</NavigationMenuItem>
				</NavigationMenuList>
			</header>
		</NavigationMenu>
	)
}
