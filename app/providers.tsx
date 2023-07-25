'use client'

import { EditorContextProvider } from '@/context/editor-context'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<EditorContextProvider>{children}</EditorContextProvider>
		</ThemeProvider>
	)
}
