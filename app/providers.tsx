'use client'

import { Provider as JotaiProvider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import { DraftsContextProvider } from '@/context/drafts-context'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<JotaiProvider>
			<DraftsContextProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
				</ThemeProvider>
			</DraftsContextProvider>
		</JotaiProvider>
	)
}
