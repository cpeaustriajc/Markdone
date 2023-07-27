'use client'

import { SessionProvider } from '@/providers/session'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	)
}
