import { getSavedDrafts } from '@/lib/utils'
import { atom } from 'jotai'

const savedMarkdown = getSavedDrafts()

export const markdownAtom = atom<string>(
	savedMarkdown
		? savedMarkdown.content
		: 'Learn more about markdown in [Markdown Guide](https://www.markdownguide.org/)',
)

export const filenameAtom = atom<string>(savedMarkdown ? savedMarkdown.filename : 'Getting Started.md')
