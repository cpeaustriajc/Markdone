'use client'

import { useDrafts } from '@/context/drafts-context'
import { Menu } from './menu'

export function Header() {
	const { state } = useDrafts()

	return (
		<header className="flex h-16 items-center gap-1.5 border-b bg-background px-4 text-foreground">
			<Menu />
			<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">{state.draft.filename}</h2>
		</header>
	)
}
