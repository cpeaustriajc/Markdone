'use client'

import { DraftsContextProvider } from '@/context/drafts-context'
import { UserPreferenceProvider } from '@/context/user-preference-context'

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<UserPreferenceProvider>
			<DraftsContextProvider>{children}</DraftsContextProvider>
		</UserPreferenceProvider>
	)
}
