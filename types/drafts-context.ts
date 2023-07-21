import { MarkdownData } from "./markdown-data"

export type State = {
	drafts: Array<MarkdownData>
}
export type Action = {
	type: 'CREATE_DRAFT' | 'READ_DRAFT' | 'UPDATE_DRAFT' | 'DELETE_DRAFT'
	payload: MarkdownData
}
type Dispatch = (action: Action) => void
export type DraftsProviderProps = { children: React.ReactNode }
export type DraftsContext = { state: State; dispatch: Dispatch }
