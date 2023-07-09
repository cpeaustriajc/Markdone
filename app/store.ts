import { atom } from 'jotai'

interface MarkdownData {
	filename: string
	content: string
}

function getSavedMarkdown(): MarkdownData | undefined {
	try {
		if (typeof window === 'undefined') return

			const markdown = localStorage.getItem('markdown')
			return JSON.parse(markdown!.toString())
	} catch (error) {
		console.log(error)
	}
}

const savedMarkdown = getSavedMarkdown()

export const markdownAtom = atom<string>(
	savedMarkdown ? savedMarkdown.content :
		'Learn more about markdown in [Markdown Guide](https://www.markdownguide.org/)',
)

export const filenameAtom = atom<string>(savedMarkdown ? savedMarkdown.filename : 'Getting Started.md')
