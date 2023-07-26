'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabaseClient } from '@/lib/supabase'
import { useTheme } from 'next-themes'

export default function LogInPage() {
	const { systemTheme } = useTheme()

	return (
		<main className="container flex items-center justify-center">
			<Auth
				supabaseClient={supabaseClient}
				appearance={{ theme: ThemeSupa }}
				theme={systemTheme}
				view="magic_link"
				providers={[]}
			/>
		</main>
	)
}
