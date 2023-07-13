import { getSavedDrafts } from '@/lib/utils'
import { useReducer, createContext, useContext } from 'react'

export interface MarkdownData {
	id: number
	filename: string
	content: string
}

type State = {
	drafts: Array<MarkdownData>
}
type Action = {
	type: 'CREATE_DRAFT' | 'READ_DRAFT' | 'UPDATE_DRAFT' | 'DELETE_DRAFT'
	payload: MarkdownData
}
type Dispatch = (action: Action) => void
type DraftsProviderProps = { children: React.ReactNode }
type DraftsContext = { state: State; dispatch: Dispatch }

const DraftsContext = createContext<DraftsContext | undefined>(undefined)

function draftsReducer(state: State, action: Action) {
	switch (action.type) {
		case 'CREATE_DRAFT':
			return {
				...state,
				drafts: [...state.drafts, action.payload],
			}
		case 'READ_DRAFT':
			return {
				...state,
				drafts: state.drafts.map(draft => {
					if (draft.id === action.payload.id) {
						return {
							...draft,
							filename: action.payload.filename,
							content: action.payload.content,
						}
					}
					return draft
				}),
			}
		case 'UPDATE_DRAFT':
			return {
				...state,
				drafts: state.drafts.map(draft => {
					if (draft.id === action.payload.id) {
						return {
							...draft,
							content: action.payload.content,
						}
					}
					return draft
				}),
			}
		case 'DELETE_DRAFT':
			return {
				...state,
				drafts: state.drafts.filter(draft => draft.id !== action.payload.id),
			}
		default:
			return state
	}
}

const savedDrafts = getSavedDrafts()

function DraftsContextProvider({ children }: DraftsProviderProps) {
	const [state, dispatch] = useReducer(draftsReducer, {
		drafts: [
			{
				id: savedDrafts?.id ?? 1,
				filename: savedDrafts?.filename ?? 'Getting Started.md',
				content:
					savedDrafts?.content ??
					'Learn more about markdown in [Markdown Guide](https://www.markdownguide.org/)',
			},
		],
	})

	const value = { state, dispatch }

	return <DraftsContext.Provider value={value}>{children}</DraftsContext.Provider>
}

function useDrafts() {
	const context = useContext(DraftsContext)
	if (context === undefined) {
		throw new Error('useDrafts must be used within a DraftsContextProvider')
	}
	return context
}

export { DraftsContextProvider, useDrafts }
