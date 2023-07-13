'use client'

import { useDrafts } from '@/context/drafts-context'
import { memo, useMemo, useRef } from 'react'

interface EditorProps {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
}
export function Editor({ editorRef }: EditorProps) {
	const { state, dispatch } = useDrafts()

	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	const lineNumber = useMemo(() => state.drafts.find(draft => draft.id === 1)?.content.split('\n').length, [state.drafts])
	// prettier-ignore
	const longestString = useMemo(() => state.drafts.find(draft => draft.id === 1)?.content.split('\n').reduce((a, b) => (a.length > b.length ? a : b)).length, [state.drafts])

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault()

		dispatch({
			type: 'UPDATE_DRAFT',
			payload: {
				id: 1,
				filename: state.drafts.find(draft => draft.id === 1)?.filename ?? '',
				content: e.target.value,
			},
		})

		localStorage.setItem('markdown', JSON.stringify({ filename: state.drafts.find(draft => draft.id === 1), content: e.target.value }))
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
			<span className="select-none" key={index}>
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
				<div className="flex h-fit w-8 flex-col items-end border-r px-2">
					<LineNumbers />
				</div>
				<textarea
					ref={textAreaRef}
					cols={longestString}
					rows={lineNumber}
					id="markdown-editor"
					name="markdown-editor"
					className="resize-none break-keep bg-background pl-1 outline-none focus:border-none active:border-none "
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					wrap="off"
					value={state.drafts.find(draft => draft.id === 1)?.content ?? ''}
					aria-label="Markdown Input"
				/>
			</div>
		</div>
	)
}
