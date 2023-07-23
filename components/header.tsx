import { Sidebar } from './sidebar'

export async function Header() {
	return (
		<header className="flex h-16 items-center gap-1.5 border-b bg-background px-4 text-foreground">
			<Sidebar />
		</header>
	)
}
