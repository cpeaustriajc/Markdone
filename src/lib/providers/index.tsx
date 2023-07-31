'use client'

import { supabaseClient } from '@/lib/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { EditorProvider } from './editor'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<QueryClientProvider client={queryClient}>
				<SessionContextProvider supabaseClient={supabaseClient}>
					<EditorProvider>{children}</EditorProvider>
				</SessionContextProvider>
			</QueryClientProvider>
		</ThemeProvider>
	)
}
