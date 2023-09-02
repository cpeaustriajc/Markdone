import { Shell } from '@/components/shell'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/prisma'
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

type Props = {
	drafts: React.ReactNode
	empty: React.ReactNode
}

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Layout({ drafts, empty }: Props) {
	const initialDrafts = await prisma.drafts.findMany()
	const AvatarLoading = () => <Skeleton className="h-9 w-9 rounded-full bg-secondary"></Skeleton>
	const containsDrafts = initialDrafts?.length === 0

	return (
		<Shell>
			<header className="flex w-52 items-center justify-between gap-20">
				<strong>Welcome!</strong>
				<ClerkLoading>
					<AvatarLoading />
				</ClerkLoading>
				<ClerkLoaded>
					<UserButton />
				</ClerkLoaded>
			</header>
			<SignedIn>{containsDrafts ? empty : drafts}</SignedIn>
			<SignedOut>
				<h1>Get Started With Markdone</h1>
				<ClerkLoading>
					<Skeleton className="h-9 w-20 bg-secondary"></Skeleton>
				</ClerkLoading>
				<ClerkLoaded>
					<SignInButton>
						<Button>Sign In</Button>
					</SignInButton>
				</ClerkLoaded>
			</SignedOut>
		</Shell>
	)
}
