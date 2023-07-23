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

		if (markdown === null) return undefined

		return JSON.parse(markdown) as MarkdownData
	} catch (error) {
		console.log('Error while parsing saved drafts: ', error)
		return undefined
	}
}

export function toKebabCase(input: string) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '')
}
