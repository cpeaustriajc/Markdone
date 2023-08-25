import '@/styles/globals.css'
import { Providers } from '@/lib/providers'

export const metadata = {
	icons: [
		{ rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' },
		{ rel: 'icon', type: 'image/png', sizes: '16x16', url: '/icon-16.png' },
		{ rel: 'icon', type: 'image/png', sizes: '32x32', url: '/icon-32.png' },
	],
	themeColor: [
		{ color: 'black', media: '(prefers-color-scheme: dark)' },
		{ color: 'white', media: '(prefers-color-scheme: light)' },
	],
	manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<head />
			<body className="h-full bg-background text-foreground">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
