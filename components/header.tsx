'use client'

import { filenameAtom } from '@/app/store'
import { useAtomValue } from 'jotai'
import { Menu } from './menu'

export function Header() {
	const filename = useAtomValue(filenameAtom)



	return (
		<header className="flex h-16 items-center gap-1.5 border-b bg-background px-4 text-foreground">
			<Menu/>
			<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
				{filename.substring(0, filename.lastIndexOf('.'))}
			</h2>
		</header>
	)
}
