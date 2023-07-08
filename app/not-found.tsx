import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const runtime = 'edge'

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center">
			<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
				404 - Not Found
			</h2>
			<p className="text-sm">
				Go back to{' '}
				<Button asChild variant="link" className="p-0">
					<Link href="/">home</Link>
				</Button>
			</p>
		</main>
	)
}
