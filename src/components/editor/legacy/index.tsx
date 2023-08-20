'use client'

import { Editor } from '@/components/editor/legacy/editor'
import { Preview } from '@/components/editor/legacy/preview'
import { Separator } from '@/components/ui/separator'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { Dispatch, ElementRef, createContext, useContext, useReducer, useRef } from 'react'

type EditorContext = { content: string; dispatch: Dispatch<{ type: string; content: string }> }

export const EditorContext = createContext<EditorContext | undefined>(undefined)

export function editorReducer(content: string, payload: { type: string; content: string }) {
	switch (payload.type) {
		case 'UPDATE_CONTENT':
			return payload.content
		default:
			return content
	}
}

export function EditorProvider({ children }: { children: React.ReactNode }) {
	const [content, dispatch] = useReducer(editorReducer, '')
	return <EditorContext.Provider value={{ content, dispatch }}>{children}</EditorContext.Provider>
}

export function useEditor() {
	const context = useContext(EditorContext)
	if (context === undefined) {
		throw new Error('useEditor must be used within a EditorProvider')
	}
	return context
}

export function LegacyEditor() {
	const editorRef = useRef<ElementRef<'div'>>(null)
	const previewRef = useRef<ElementRef<'div'>>(null)
	useSyncScroll(editorRef, previewRef)

	return (
		<>
			<Editor editorRef={editorRef} />
			<Separator orientation="horizontal" className="lg:hidden" />
			<Separator orientation="vertical" className="hidden md:block" />
			<Preview previewRef={previewRef} />
		</>
	)
}
