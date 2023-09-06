import { Shell } from '@/components/shell'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

type Props = {
	signedIn: React.ReactNode
	signedOut: React.ReactNode
}

export const metadata = {
	title: 'Markdone | Get more things done with markdone!',
}

export default async function Layout({ signedIn, signedOut }: Props) {

	const supabase = createServerComponentClient({ cookies })
	const session = await supabase.auth.getSession()
	return (
		<Shell>
			<header className="flex w-52 items-center justify-between gap-20">
				<strong>Welcome!</strong>
			</header>
			{session ? signedIn : signedOut}
		</Shell>
	)
}
