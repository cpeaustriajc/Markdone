'use client'

import { supabase } from '@/lib/supabase'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditorProvider } from './editor'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionContextProvider supabaseClient={supabase}>
				<EditorProvider>{children}</EditorProvider>
			</SessionContextProvider>
		</QueryClientProvider>
	)
}
