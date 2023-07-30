import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export function ErrorPage() {
	const error = useRouteError()
	let errorMessage: string

	if (isRouteErrorResponse(error)) {
		errorMessage = error.error?.message || error.statusText
	}

	if (error instanceof Error) {
		errorMessage = error.message
	}

	if (typeof error === 'string') {
		errorMessage = error
	}

	console.error(error)
	errorMessage = 'Unknown error'

	return (
		<main className="flex h-full flex-col items-center justify-center">
			<section>
				<strong className="text-lg font-semibold">Something went wrong!</strong>
			</section>

			<p>
				<em>{errorMessage}</em>
			</p>

			<Button>
				<ReloadIcon className="mr-2 h-4 w-4" />
				Reset
			</Button>
		</main>
	)
}
