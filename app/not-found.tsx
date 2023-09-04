import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-4 bg-background text-foreground">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Page not Found</h1>
			<Button asChild>
				<Link href="/">Return</Link>
			</Button>
		</main>
	)
}
