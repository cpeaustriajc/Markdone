import { useReducer, createContext, useContext } from 'react'
import { EditorContext, State, Action, EditorProviderProps } from '@/types/editor-context.types'
import { MarkdownData } from '@/types/markdown-data.types'

const EditorContext = createContext<EditorContext | undefined>(undefined)

function editorReducer(drafts: State, action: Action): State {
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

export function EditorContextProvider({ children }: EditorProviderProps) {
	const [drafts, dispatch] = useReducer(editorReducer, initialState)

	const value = { drafts, dispatch }

	return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
	const context = useContext(EditorContext)
	if (context === undefined) {
		throw new Error('useDrafts must be used within a DraftsContextProvider')
	}
	return context
}
