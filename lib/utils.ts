import { MarkdownData } from '@/types/markdown-data'
import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getSavedDrafts(): MarkdownData | undefined {
	try {
		if (typeof window === 'undefined') return

		const markdown = localStorage.getItem('markdown')

		if (!markdown) {
			console.error('No markdown found in local storage')
			throw new Error()
		}
		return JSON.parse(markdown.toString())
	} catch (error) {
		console.log(error)
	}
}
