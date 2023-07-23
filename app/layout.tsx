import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { getTheme } from './actions'
import { Header } from '@/components/header'

export const metadata = {
	title: 'Markdone | Get more things done with Markdone!',
	description: 'Get more things done with Markdone!',
	colorScheme: 'dark light',
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
	drafts: React.ReactNode
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	const theme = getTheme()
	return (
		<html
			lang="en"
			className={`${inter.variable} ${roboto_mono.variable} h-full ${theme}`}
			style={{ colorScheme: theme }}>
			<body className="h-full bg-background text-foreground">
				<Providers>
					<Header />

					{props.drafts}
					{props.children}
				</Providers>
			</body>
		</html>
	)
}
