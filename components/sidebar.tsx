import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useDrafts } from '@/context/drafts-context'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function Sidebar() {
	const { state, dispatch } = useDrafts()
	// Workaround until https://github.com/radix-ui/primitives/issues/1386 is fixed
	const [domLoaded, setDomLoaded] = useState(false)

	useEffect(() => {
		setDomLoaded(true)
	}, [])

	return (
		<Sheet>
			<div className="h-9 w-14">
				{domLoaded && (
					<SheetTrigger asChild>
						<Button variant="ghost">
							<span className="sr-only">Open Menu</span> <HamburgerMenuIcon className="h-6 w-6" />
						</Button>
					</SheetTrigger>
				)}
			</div>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="grid w-full gap-1.5">
					<Button
						className="justify-start text-left"
						onClick={() => {
							dispatch({ type: 'CREATE_DRAFT' })
						}}>
						New
					</Button>
					<h2 className="text-lg font-semibold text-foreground">Drafts</h2>
					{/* <Button className="justify-start text-left" variant="ghost" asChild> */}
					{/* <Link href={"/" + state.draft.id}>{state.draft.filename}</Link> */}
					{/* </Button> */}
				</div>
			</SheetContent>
		</Sheet>
	)
}
