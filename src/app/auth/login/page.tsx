'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useTheme } from 'next-themes'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function LogInPage() {
	const { systemTheme } = useTheme()
	const supabase = useSupabaseClient()

	return (
		<main className="container flex items-center justify-center">
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				theme={systemTheme}
				view="magic_link"
				showLinks={false}
				providers={[]}
				redirectTo="http://localhost:3000/profile"
			/>
		</main>
	)
}
