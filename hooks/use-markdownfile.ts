import { create } from 'zustand'

interface MarkdownFileState {
  markdownFile: string
  updateContent: (document: string) => void
}

export const useMarkdownFile = create<MarkdownFileState>((set) => ({
  markdownFile:
    'Get started with Markdone by learning [markdown](https://www.markdownguide.org/)',
  updateContent: (document) => set(() => ({ markdownFile: document })),
}))
