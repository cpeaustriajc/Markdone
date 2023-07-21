import { Toaster } from '@/components/ui/toaster'
import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { getTheme } from './actions'

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
	children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
	const theme = getTheme()
	return (
		<html lang="en" className={`${inter.variable} ${roboto_mono.variable} h-full ${theme}`}>
			<body className="h-full bg-background text-foreground">
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	)
}
