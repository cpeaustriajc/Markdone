import { Header } from '@/components/header'
import { inter, roboto_mono } from '@/lib/fonts'
import Providers from '@/lib/providers'
import '@/styles/globals.css'

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
