import { EmptyView } from '@/app/empty-view'
import { DraftsView } from '@/app/drafts-view'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { serverClient } from '@/lib/trpc/serverClient'

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Page() {
	const initialDrafts = await serverClient.getDrafts()

	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-4 bg-background font-sans text-foreground">
			<SignedIn>
				<header>
					<UserButton />
				</header>
				{initialDrafts?.length === 0 ? <EmptyView /> : <DraftsView initialDrafts={initialDrafts} />}
			</SignedIn>
			<SignedOut>
				<h1>Get Started With Markdone</h1>
				<SignInButton>
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>
		</main>
	)
}
