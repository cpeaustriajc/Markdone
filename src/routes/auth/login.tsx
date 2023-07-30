import { Auth } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export function Login() {
	const supabase = useSupabaseClient()

	return (
		<main className="container flex items-center justify-center">
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				view="magic_link"
				showLinks={false}
				providers={[]}
				redirectTo="http://localhost:3000/profile"
			/>
		</main>
	)
}
