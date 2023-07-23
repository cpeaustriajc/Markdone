import { Dispatch } from 'react'
import { MarkdownData } from './markdown-data'

export type State = { draft: MarkdownData }
export type Action =
	| { type: 'CREATE_DRAFT'; }
	| { type: 'READ_DRAFT'; payload: MarkdownData }
	| { type: 'UPDATE_DRAFT'; payload: MarkdownData }
	| { type: 'DELETE_DRAFT'; payload: string }
export type DraftsProviderProps = { children: React.ReactNode }
export type DraftContext = { state: State; dispatch: Dispatch<Action> }
