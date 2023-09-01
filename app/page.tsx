import { EmptyView } from '@/app/empty-view'
import { DraftsView } from '@/app/drafts-view'
import { ClerkLoaded, ClerkLoading, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { prisma } from '@/lib/prisma'

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Page() {
	const initialDrafts = await prisma.drafts.findMany()
	const AvatarLoading = () => <Skeleton className="h-9 w-9 rounded-full bg-secondary"></Skeleton>
	const containsDrafts = initialDrafts?.length === 0
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-4 bg-background font-sans text-foreground">
			<SignedIn>
				<header className="flex w-52 items-center justify-between gap-20">
					<strong>Welcome!</strong>
					<ClerkLoading>
						<AvatarLoading />
					</ClerkLoading>
					<ClerkLoaded>
						<UserButton />
					</ClerkLoaded>
				</header>
				{containsDrafts ? <EmptyView /> : <DraftsView />}
			</SignedIn>
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
		</main>
	)
}
