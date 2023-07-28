'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { GitHubLogoIcon, MoonIcon, Pencil2Icon, SunIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export function Header() {
	const { setTheme } = useTheme()
	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div>
				<Button asChild variant="ghost">
					<Link href="/">
						<span className="sr-only">Home</span>
						<Pencil2Icon className="h-6 w-6" />
					</Link>
				</Button>
			</div>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<Link href="https://github.com/jaycedotbin/markdone" target="_blank" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<span className="sr-only">View on GitHub</span>
								<GitHubLogoIcon className="h-5 w-5" />
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<Link href="https://twitter.com/jaycedotbin" target="_blank" legacyBehavior passHref>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								<span className="sr-only">Follow me on twitter for updates</span>
								<TwitterLogoIcon className="h-5 w-5" />
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost">
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
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
