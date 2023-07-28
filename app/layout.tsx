import { Header } from '@/components/landing/header'
import { inter, roboto_mono } from '@/lib/fonts'
import Providers from '@/lib/providers'
import '@/styles/globals.css'

export const metadata = {
	title: 'Markdone | Get more things done with Markdone!',
	description: 'Get more things done with Markdone!',
	manifest: '/site.webmanifest',
}

interface Props {
	children: React.ReactNode
}

export default function RootLayout(props: Props) {
	return (
		<html lang="en" className={`${inter.variable} ${roboto_mono.variable} h-full`} suppressHydrationWarning>
			<body className="h-full bg-background text-foreground">
				<Header/>
				<Providers>{props.children}</Providers>
			</body>
		</html>
	)
}
