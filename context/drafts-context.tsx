import { useReducer, createContext, useContext } from 'react'
import { DraftContext, State, Action, DraftsProviderProps } from '@/types/drafts-context'
import { MarkdownData } from '@/types/markdown-data'

const DraftContext = createContext<DraftContext | undefined>(undefined)

function draftReducer(state: State, action: Action): State {
	switch (action.type) {
		case 'CREATE_DRAFT':
			const newDraft: MarkdownData = {
				id: Math.random().toString(36).substring(7),
				filename: 'New File.md',
				content: action.payload,
			}
			return {
				draft: newDraft,
			}
		case 'READ_DRAFT':
			return {
				...state,
				draft: { id: action.payload.id, filename: action.payload.filename, content: action.payload.content },
			}
		case 'UPDATE_DRAFT':
			return {
				...state,
				draft: {
					id: action.payload.id,
					filename: action.payload.filename,
					content: action.payload.content,
				},
			}
		case 'DELETE_DRAFT':
			return {
				...state,
				draft: {
					id: '',
					filename: '',
					content: '',
				},
			}
		default:
			return state
	}
}

const initialState: State = {
	draft: {
		id: '0',
		filename: 'Getting Started.md',
		content: 'Get started with markdown via [Markdown Guide](https://www.markdownguide.org/)',
	},
}

function DraftContextProvider({ children }: DraftsProviderProps) {
	const [state, dispatch] = useReducer(draftReducer, initialState)

	const value = { state, dispatch }

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
