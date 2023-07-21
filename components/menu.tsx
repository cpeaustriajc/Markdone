import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useDrafts } from '@/context/drafts-context'

export function Menu() {
	const { state, dispatch } = useDrafts()

	const openFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader()

		if (e.target.files === null) throw new Error('No file selected')

		reader.readAsText(e.target.files[0])

		reader.onload = () => {
			let text = reader.result
			if (e.target.files === null) throw new Error('No file selected')

			dispatch({
				type: 'UPDATE_DRAFT',
				payload: {
					id: '1',
					filename: e.target.files[0].name,
					content: text as string,
				},
			})

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
		const file = new Blob([state.draft.filename], {
			type: 'text/markdown; charset=UTF-8; variant=GFM',
		})
		element.href = URL.createObjectURL(file)
		element.download = state.draft.filename
		document.body.appendChild(element)
		element.click()
	}

	return (
		<Sheet>
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
					<Input
						id="save"
						value={state.draft.filename}
						onChange={e =>
							dispatch({
								type: 'UPDATE_DRAFT',
								payload: {
									id: '1',
									filename: e.target.value,
									content: state.draft.content,
								},
							})
						}
						required
					/>
					<Button onClick={saveFile}>Save File</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
