'use client'

import { ThemeProvider } from 'next-themes'
import { DraftsContextProvider } from '@/context/drafts-context'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<DraftsContextProvider>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{children}
			</ThemeProvider>
		</DraftsContextProvider>
	)
}
