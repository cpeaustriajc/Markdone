'use client'

import { useEditor } from '@/context/editor-context'
import { useFetchDraft } from '@/lib/supabase'
import { useRef, memo } from 'react'
import { LoadingSkeleton } from './loading-skeleton'

interface EditorProps {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
	id: string
}

export function Editor({ editorRef, id }: EditorProps) {
	const { draft, isLoading } = useFetchDraft(id)
	const textAreaRef = useRef<HTMLTextAreaElement>(null)
	const { dispatch } = useEditor()

	if (isLoading || !draft) {
		return <LoadingSkeleton />
	}

	const lineNumber = draft.content.split('\n').length
	const longestString = draft.content.split('\n').reduce((a: any, b: any) => (a.length > b.length ? a : b)).length

	const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault()

		dispatch({ type: 'UPDATE_DRAFT', payload: { id: draft.id, content: e.target.value, filename: draft.filename } })
	}

	const insertTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textArea = textAreaRef.current!
		const start = textArea.selectionStart
		const end = textArea.selectionEnd

		// prettier-ignore
		textArea.value = textAreaRef.current?.value.substring(0, start) + '\t' + textAreaRef.current?.value.substring(end)

		e.preventDefault()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		switch (e.key) {
			case 'Tab':
				insertTab(e)
		}
	}

	const LineNumbers = memo(() => {
		return Array.from({ length: lineNumber! }).map((_, index) => (
			<span className="select-none text-secondary" key={index}>
				{index + 1}
			</span>
		))
	})
	LineNumbers.displayName = 'LineNumbers'

	return (
		<div ref={editorRef} className="shrink-0 grow-0 basis-1/2 overflow-auto font-mono text-sm">
			<label htmlFor="markdown-editor" className="sr-only">
				Markdown Editor
			</label>
			<div className="flex flex-row overflow-auto">
				<div className="flex h-fit w-8 flex-col items-end border-r px-2 text-lg">
					<LineNumbers />
				</div>
				<textarea
					ref={textAreaRef}
					cols={longestString}
					rows={lineNumber}
					id="markdown-editor"
					name="markdown-editor"
					className="resize-none break-keep bg-background pl-1 text-lg outline-none focus:border-none active:border-none"
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					wrap="off"
					value={draft.content}
					aria-label="Markdown Input"
				/>
			</div>
		</div>
	)
}
