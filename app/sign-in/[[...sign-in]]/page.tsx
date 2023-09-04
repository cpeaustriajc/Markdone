import { SignIn } from '@clerk/nextjs'

export default function Page() {
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-4 bg-background font-sans text-foreground">
			<SignIn />
		</main>
	)
}
