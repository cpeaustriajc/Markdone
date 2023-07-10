import * as React from 'react'

type State = {
	drafts: Array<{
		id: string
		filename: string
		content: string
	}>
}
type Action = {
	type: 'ADD_DRAFT' | 'REMOVE_DRAFT'
	payload: { id: string; filename: string; content: string }
}
type Dispatch = (action: Action) => void
type DraftsProviderProps = { children: React.ReactNode }
type DraftsContext = { state: State; dispatch: Dispatch }

const DraftsContext = React.createContext<DraftsContext | undefined>(undefined)

function draftsReducer(state: State, action: Action) {
	switch (action.type) {
		case 'ADD_DRAFT':
			return {
				...state,
				drafts: [...state.drafts, action.payload],
			}
		case 'REMOVE_DRAFT':
			return {
				...state,
				drafts: state.drafts.filter(draft => draft.id !== action.payload.id),
			}
		default:
			return state
	}
}

function DraftsContextProvider({ children }: DraftsProviderProps) {
	const [state, dispatch] = React.useReducer(draftsReducer, { drafts: [] })

	const value = { state, dispatch }

	return <DraftsContext.Provider value={value}>{children}</DraftsContext.Provider>
}

function useDrafts() {
	const context = React.useContext(DraftsContext)
	if (context === undefined) {
		throw new Error('useDrafts must be used within a DraftsContextProvider')
	}
	return context
}

export { DraftsContextProvider, useDrafts }
