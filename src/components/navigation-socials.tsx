import { Link } from 'react-router-dom'
import { NavigationMenuItem, navigationMenuTriggerStyle } from './ui/navigation-menu'
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

export function NavigationSocials() {
	return (
		<>
			<NavigationMenuItem>
				<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
					<Link to="https://github.com/jaycedotbin/markdone" target="_blank">
						<span className="sr-only">View on GitHub</span>
						<GitHubLogoIcon className="h-5 w-5" />
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
					<Link to="https://twitter.com/jaycedotbin" target="_blank">
						<span className="sr-only">Follow me on twitter for updates</span>
						<TwitterLogoIcon className="h-5 w-5" />
					</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</>
	)
}
