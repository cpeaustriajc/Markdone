import { filenameAtom } from '@/app/store'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { Button } from './ui/button'
import { useDrafts } from '@/context/drafts-context'

export function Menu() {
	const [filename, setFilename] = useAtom(filenameAtom)
	const [doc, setDoc] = useAtom(filenameAtom)
	const { state, dispatch } = useDrafts()


	const openFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()

		if (e.target.files === null) throw new Error('No file selected')

		reader.readAsText(e.target.files[0])

		reader.onload = () => {
			let text = reader.result
			setDoc(text as string)
			if (e.target.files === null) throw new Error('No file selected')
			localStorage.removeItem('markdown')
			localStorage.setItem(
				'markdown',
				JSON.stringify({
					filename: e.target.files[0].name,
					content: reader.result,
				}),
			)
		}
	}

	const saveFile = () => {
		const element = document.createElement('a')
		const file = new Blob([doc], { type: 'text/markdown; charset=UTF-8; variant=GFM' })
		element.href = URL.createObjectURL(file)
		element.download = filename
		document.body.appendChild(element)
		element.click()
	}

return (	<Sheet>
	<SheetTrigger>
		<span className="sr-only">Open Menu</span> <HamburgerMenuIcon className="h-6 w-6" />
	</SheetTrigger>
	<SheetContent side="left">
		<SheetHeader>
			<SheetTitle>Menu</SheetTitle>
		</SheetHeader>
		<div className="grid w-full gap-1.5">
			<Label htmlFor="upload">Open File</Label>
			<Input id="upload" type="file" onChange={openFile} />
			<Label htmlFor="save">Save File</Label>
			<Input id="save" value={filename} onChange={e => setFilename(e.target.value)} required />
			<Button onClick={saveFile}>Save File</Button>
		</div>
	</SheetContent>
</Sheet>)
}
