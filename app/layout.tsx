import '@/styles/globals.css'
import { Providers } from '@/lib/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { inter, roboto_mono } from '@/lib/fonts'
import { dark } from '@clerk/themes'

export const metadata = {
	themeColor: [
		{ color: 'black', media: '(prefers-color-scheme: dark)' },
		{ color: 'white', media: '(prefers-color-scheme: light)' },
	],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang="en" className={`h-full ${roboto_mono.variable} ${inter.variable}`} suppressHydrationWarning>
				<head />
				<body className="h-full bg-background text-foreground">
					<Providers>{children}</Providers>
				</body>
			</html>
		</ClerkProvider>
	)
}
