import { Button } from '@/components/ui/button'
import { createDraft } from './_actions/draft'

export function EmptyView() {
	return (
		<>
			<h1 className="w-52 scroll-m-20 text-center font-semibold">You have no files open</h1>
			<form action={createDraft}>
				<Button type="submit" className="w-52">
					New
				</Button>
			</form>
		</>
	)
}
