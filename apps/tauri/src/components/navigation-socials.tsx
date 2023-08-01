import Link from 'next/link'
import { NavigationMenuItem, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

export function NavigationSocials() {
	return (
		<>
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
		</>
	)
}
