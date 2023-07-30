import { Database } from '@/types/database.types'
import { createContext, Dispatch, Reducer, useContext, useReducer } from 'react'

export type Draft = Database['public']['Tables']['drafts']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
type Action = { type: 'UPDATE_CONTENT'; payload: Draft['content'] }
type ContextValue = { draft: Partial<Draft>; dispatch: Dispatch<Action> }

const EditorContext = createContext<ContextValue | undefined>(undefined)

function editorReducer(draft: Partial<Draft>, action: Action): Partial<Draft> {
	switch (action.type) {
		case 'UPDATE_CONTENT':
			return { ...draft, content: action.payload }
		default:
			throw Error('Invalid action type: ' + action)
	}
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
	const initialState: Partial<Draft> = {
		content: '',
	}

	const [draft, dispatch] = useReducer<Reducer<Partial<Draft>, Action>>(editorReducer, initialState)
	const value = { draft, dispatch }

	return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditor() {
	const context = useContext(EditorContext)
	if (context === undefined) {
		throw new Error('useEditor must be used within a EditorProvider')
	}
	return context
}
