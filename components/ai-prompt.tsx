'use client'

import { useCompletion } from 'ai/react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { toast } from './ui/use-toast'

export default function AIPrompt() {
	const { completion, isLoading, input, handleInputChange, handleSubmit } = useCompletion(
		{
			api: '/api/completion',
			onResponse: res => {
				switch (res.status) {
					case 429:
						toast({
							variant: 'destructive',
							title: 'Uh oh! Something went wrong.',
							description:
								'You are being rate limited. Please try again later.',
						})
					case 500:
						toast({
							variant: 'destructive',
							title: 'Uh oh! Something went wrong.',
							description:
								'Something went wrong with out servers. Please try again later.',
						})
				}
			},
			onFinish: () => {
				toast({
					title: 'Success!',
					description: 'Your markdown has been generated.',
				})
			},
		},
	)

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<form onSubmit={handleSubmit}>
				<div className=" fixed bottom-0 mb-8 ml-2 flex w-full max-w-md rounded p-2">
					<Label className="sr-only" htmlFor="ai-prompt">
						AI Prompt
					</Label>
					<Input
						type="text"
						id="ai-prompt"
						value={input}
						className="flex-grow  shadow-xl dark:shadow-zinc-700"
						placeholder="Describe the content of your markdown here..."
						onChange={handleInputChange}
					/>
					<Button
						type="submit"
						className="relative bottom-0 mb-8 max-w-xs rounded p-2"
						variant="outline"
						disabled={isLoading}>
						Submit
					</Button>
					<Button
						className="relative bottom-0 mb-8 max-w-xs rounded p-2"
						variant="destructive">
						Stop
					</Button>
				</div>
			</form>
			<output className='whitespace-pre-wrap my-6'>{completion}</output>
		</div>
	)
}
