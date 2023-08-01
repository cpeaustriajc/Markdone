'use client'

import { Editor } from '@/components/legacy-editor/editor'
import { Preview } from '@/components/legacy-editor/preview'
import { Separator } from '@/components/ui/separator'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { Dispatch, ElementRef, SetStateAction, createContext, useContext, useRef, useState } from 'react'

export const EditorContext = createContext<{ content: string; setContent: Dispatch<SetStateAction<string>> } | undefined>(undefined)


export function EditorProvider({ children }: { children: React.ReactNode }) {
	const [content, setContent] = useState('')
	return <EditorContext.Provider value={{ content, setContent }}>{children}</EditorContext.Provider>
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
		<EditorProvider>
			<Editor editorRef={editorRef} />
			<Separator orientation="vertical" />
			<Preview previewRef={previewRef} />
		</EditorProvider>
	)
}
