import { useSessionStorage } from '@/hooks/use-session-storage'
import { createContext, Dispatch, Reducer, useContext, useEffect, useReducer, useState } from 'react'

export interface Draft {
	id: string
	filename: string
	content: string
}

type Action =
	| { type: 'CREATE_DRAFT'; payload: Draft }
	| { type: 'DELETE_DRAFT'; payload: string }
	| { type: 'GET_DRAFT'; payload: string }
type ContextValue = { drafts: Draft[]; dispatch: Dispatch<Action> }

const DraftsContext = createContext<ContextValue | undefined>(undefined)

function draftsReducer(drafts: Draft[], action: Action) {
	switch (action.type) {
		case 'CREATE_DRAFT':
			const newDraft = {
				id: action.payload.id,
				filename: action.payload.filename,
				content: action.payload.content,
			}
			return [...drafts, newDraft]
		case 'DELETE_DRAFT':
			return drafts.filter(draft => draft.id !== action.payload)
		default:
			throw Error('Invalid action type: ' + action)
	}
}

export function DraftsProvider({ children }: { children: React.ReactNode }) {
	const [initialState] = useSessionStorage('markdone:drafts', [] as Draft[])

	const [drafts, dispatch] = useReducer<Reducer<Draft[], Action>>(draftsReducer, initialState)
	const value = { drafts, dispatch }

	return <DraftsContext.Provider value={value}>{children}</DraftsContext.Provider>
}

export function useDrafts() {
	const context = useContext(DraftsContext)
	if (context === undefined) {
		throw new Error('useEditor must be used within a EditorProvider')
	}
	return context
}
