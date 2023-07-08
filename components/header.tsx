'use client'

import { filenameAtom, markdownAtom } from '@/app/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { Button } from './ui/button'

export function Header() {
	const [doc, setDoc] = useAtom(markdownAtom)
	const [filename, setFilename] = useAtom(filenameAtom)

	const openFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()

		reader.onload = () => {
			let text = reader.result
			setDoc(text as string)
		}

		reader.readAsText(e.target.files![0])
	}

	const saveFile = () => {
		const element = document.createElement('a')
		const file = new Blob([doc], { type: 'text/plain' })
		element.href = URL.createObjectURL(file)
		element.download = filename
		document.body.appendChild(element)
		element.click()
	}

	return (
		<header className="flex h-16 items-center gap-1.5 border-b bg-background px-4 text-foreground">
			<Sheet>
				<SheetTrigger>
					<span className="sr-only">Open Menu</span>{' '}
					<HamburgerMenuIcon className="h-6 w-6" />
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
					</SheetHeader>
					<div className="grid w-full gap-1.5">
						<Label htmlFor="upload">Open File</Label>
						<Input id="upload" type="file" onChange={openFile} />
						<Label htmlFor="save">Save File</Label>
						<Input
							id="save"
							value={filename}
							onChange={e => setFilename(e.target.value)}
							required
						/>
						<Button onClick={saveFile}>Save File</Button>
					</div>
				</SheetContent>
			</Sheet>

			<h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
				{filename.substring(0, filename.lastIndexOf('.'))}
			</h2>
		</header>
	)
}
