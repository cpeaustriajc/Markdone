'use client'

import { Database } from '@/types/database.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Session } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

interface SessionContextProviderProps {
	children: React.ReactNode
}

const SessionContext = createContext<{ session: Session | null } | undefined>(undefined)

export function SessionProvider({ children }: SessionContextProviderProps) {
	const supabase = createClientComponentClient<Database>()
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session }, error }) => {
			if (error) {
				throw error
			}
			setSession(session)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})

		return () => subscription.unsubscribe()
	}, [supabase])

	return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>
}

export function useSession() {
	const context = useContext(SessionContext)

	if (context === undefined) {
		throw new Error('useSession must be used within a SessionContextProvider')
	}

	return context
}
