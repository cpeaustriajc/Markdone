import { atom } from 'jotai'

export const markdownAtom = atom<string>(
  'Learn more about markdown in [Markdown Guide](https://www.markdownguide.org/)'
)

export const filenameAtom = atom<string>('file.md')
