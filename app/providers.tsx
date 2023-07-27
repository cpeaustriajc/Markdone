'use client'

import { supabaseClient } from '@/lib/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" enableSystem defaultTheme="system">
			<SessionContextProvider supabaseClient={supabaseClient}>
				{children}
			</SessionContextProvider>
		</ThemeProvider>
	)
}
