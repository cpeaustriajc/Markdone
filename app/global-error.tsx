'use client'

type Props = { error: Error; reset: () => void }

export default function Error({ reset }: Props) {
	return (
		<html>
			<body>
				<div>
					<h2>Something went wrong!</h2>
					<button onClick={() => reset()}>Try again</button>
				</div>
			</body>
		</html>
	)
}
