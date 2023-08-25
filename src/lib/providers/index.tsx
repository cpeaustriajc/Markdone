'use client'

import { ThemeProvider } from 'next-themes'
import { DraftsProvider } from '@/lib/providers/drafts'
import { EditorProvider } from '@/components/editor/legacy'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<EditorProvider>
				<DraftsProvider>{children}</DraftsProvider>
			</EditorProvider>
		</ThemeProvider>
	)
}
