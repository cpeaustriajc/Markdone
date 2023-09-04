import { StateCreator, create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface EditorState {
	content: string
	setContent: (content: string) => void
}

const draftsStore: StateCreator<EditorState> = set => ({
	content: '',
	setContent: content => set({ content }),
})

export const useDraftsStore = create(
	persist<EditorState>(draftsStore, {
		name: 'markdone:drafts',
		storage: createJSONStorage(() => sessionStorage),
	}),
)
