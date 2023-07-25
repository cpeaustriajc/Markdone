import { Header } from '@/components/header'
import { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
	title: 'Markdone | Get more things done with Markdone!',
	description: 'Get more things done with Markdone!',
	manifest: '/site.webmanifest',
}

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

const roboto_mono = Roboto_Mono({
	subsets: ['latin'],
	variable: '--font-roboto-mono',
})

interface Props {
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	return (
		<html lang="en" className={`${inter.variable} ${roboto_mono.variable} h-full`} suppressHydrationWarning>
			<body className="h-full bg-background text-foreground">
				<Providers>
					<Header />
					{props.children}
				</Providers>
			</body>
		</html>
	)
}
