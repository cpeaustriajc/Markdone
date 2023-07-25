import { GitHubLogoIcon, MoonIcon, SunIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import { Sidebar } from './sidebar'
import { Button } from './ui/button'
import Link from 'next/link'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import { NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu'
export function Header() {

export async function Header() {
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
						</div>
					</NavigationMenuItem>
				</NavigationMenuList>
			</header>
		</NavigationMenu>
	)
}
