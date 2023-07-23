import { useReducer, createContext, useContext } from 'react'
import { DraftContext, State, Action, DraftsProviderProps } from '@/types/drafts-context.types'
import { MarkdownData } from '@/types/markdown-data.types'

const DraftContext = createContext<DraftContext | undefined>(undefined)

function draftReducer(drafts: State, action: Action): State {
	switch (action.type) {
		case 'CREATE_DRAFT':
			const newDraft: MarkdownData = {
				id: Math.random().toString(36).substring(7),
				filename: 'Untitled',
				content: '',
			}
			return [...drafts, newDraft]
		case 'UPDATE_DRAFT':
			return drafts.map(draft => {
				if (draft.id === action.payload.id) {
					return { ...draft, filename: action.payload.filename, content: action.payload.content }
				}
				return draft
			})
		case 'DELETE_DRAFT':
			return drafts.filter(draft => draft.id !== action.id)
		default:
			return drafts
	}
}

const initialState: State = []

function DraftContextProvider({ children }: DraftsProviderProps) {
	const [drafts, dispatch] = useReducer(draftReducer, initialState)

	const value = { drafts, dispatch }

	return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>
}

function useDrafts() {
	const context = useContext(DraftContext)
	if (context === undefined) {
		throw new Error('useDrafts must be used within a DraftsContextProvider')
	}
	return context
}

export { DraftContextProvider as DraftsContextProvider, useDrafts }
