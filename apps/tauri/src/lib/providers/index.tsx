import { ThemeProvider } from 'next-themes'
import { DraftsProvider } from '@/lib/providers/drafts'

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<DraftsProvider>{children}</DraftsProvider>
		</ThemeProvider>
	)
}
