import { Dispatch } from 'react'
import { MarkdownData } from './markdown-data.types'

export type State = MarkdownData[]
export type Action =
	| { type: 'CREATE_DRAFT' }
	| { type: 'READ_DRAFT'; payload: MarkdownData }
	| { type: 'UPDATE_DRAFT'; payload: MarkdownData }
	| { type: 'DELETE_DRAFT'; id: string }
export type EditorProviderProps = { children: React.ReactNode }
export type EditorContext = { drafts: State; dispatch: Dispatch<Action> }
