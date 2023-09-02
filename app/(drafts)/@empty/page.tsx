import { Button } from '@/components/ui/button'
import { createDraft } from '@/app/_actions/draft'

export default function Page() {
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
