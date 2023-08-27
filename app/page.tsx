import { EmptyView } from '@/app/empty-view'
import { DraftsView } from '@/app/drafts-view'
import { prisma } from '@/lib/prisma'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Page() {
	const drafts = await prisma.drafts.findMany()

	return (
		<>
			<SignedIn>
				<UserButton />
				{drafts?.length === 0 ? <EmptyView /> : <DraftsView />}
			</SignedIn>
			<SignedOut>
				<h1>Get Started With Markdone</h1>
				<SignInButton>
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>
		</>
	)
}
