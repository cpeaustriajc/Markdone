'use client'

import { DraftsContextProvider } from '@/context/drafts-context'

export default function Providers({ children }: { children: React.ReactNode }) {
	return <DraftsContextProvider>{children}</DraftsContextProvider>
}
