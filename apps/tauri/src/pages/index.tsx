import { Header } from '@/components/header'
import Head from 'next/head'

export default function HomePage() {
	return (
		<>
				<Head>
					<title>Markdone | Get more things done with markdone!</title>
				</Head>
				<Header />
				<main className="container flex h-[calc(100%-4rem)] flex-col justify-center font-sans bg-background text-foreground">
					<div className="self-center">
						<h1 className="scroll-m-20 text-center text-2xl font-semibold">
							You have no files open, <br />
							click on the menu to open a file
						</h1>
					</div>
				</main>
		</>
	)
}
