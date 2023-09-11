import { CxOptions, cx } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { Tables } from './common.types'

export function cn(...inputs: CxOptions) {
	return twMerge(cx(inputs))
}

export function toKebabCase(input: string) {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '')
}

function getBaseUrl() {
	if (typeof window !== 'undefined') return ''
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
	return `http://localhost:${process.env.PORT || 3000}`
}

export function getUrl() {
	return `${getBaseUrl()}`
}

export function downloadMarkdownFile(draft: Tables<'drafts'>) {
	const a = document.createElement('a')
	// temporary fix
	const blob = new Blob([draft.content ?? ''], { type: 'text/plain' })
	const url = URL.createObjectURL(blob)
	a.href = url
	a.download = `${draft.filename}.md`
	a.click()
	URL.revokeObjectURL(url)
	a.remove()
}
