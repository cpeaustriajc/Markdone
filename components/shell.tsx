export function Shell({ children }: { children: React.ReactNode }) {
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col items-center justify-center gap-4 bg-background font-sans text-foreground">
			{children}
		</main>
	)
}
