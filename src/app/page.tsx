import { Header } from '@/components/header'

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Page() {
	return (
		<>
			<Header />
			<main className="container flex h-[calc(100%-4rem)] flex-col justify-center bg-background font-sans text-foreground">
				<div className="self-center">
					<h2 className="scroll-m-20 text-center text-2xl font-semibold">
						You have no files open, <br />
						click on the menu to open a file
					</h2>
				</div>
			</main>
		</>
	)
}
