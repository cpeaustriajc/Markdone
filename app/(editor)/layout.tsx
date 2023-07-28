import { Header } from '@/components/editor/header'
import { inter, roboto_mono } from '@/lib/fonts'
import Providers from '@/lib/providers'
import '@/styles/globals.css'

export const metadata = {
	manifest: '/site.webmanifest',
	themeColor: [
		{
			media: '(prefers-color-scheme: dark)',
			color: 'black',
		},
		{
			media: '(prefers-color-scheme: light)',
			color: 'black',
		},
	],
}

interface Props {
	children: React.ReactNode
}

export default function EditorRootLayout(props: Props) {
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
