'use client'

import { useRef, memo, ElementRef, useContext } from 'react'
import { EditorContext, useEditor } from '.'

interface EditorProps {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
}

export function Editor({ editorRef }: EditorProps) {
	const textAreaRef = useRef<ElementRef<'textarea'>>(null)
	const { content, setContent } = useEditor()
	const lineNumber = content.split('\n').length
	const longestString = content.split('\n').reduce((a, b) => (a.length > b.length ? a : b)).length

	// TODO Update content when the user changes the content, use useUpdateDraftMutation to save on server, then use Zustand or React Reducer & Context to handle state
	const insertTab = (e: React.KeyboardEvent<ElementRef<'textarea'>>) => {
		const textArea = textAreaRef.current!
		const start = textArea.selectionStart
		const end = textArea.selectionEnd

		// prettier-ignore
		textArea.value = textAreaRef.current?.value.substring(0, start) + '\t' + textAreaRef.current?.value.substring(end)

		e.preventDefault()
	}

	const handleKeyDown = (e: React.KeyboardEvent<ElementRef<'textarea'>>) => {
		switch (e.key) {
			case 'Tab':
				insertTab(e)
		}
	}

	const LineNumbers = memo(() => {
		return Array.from({ length: lineNumber! }).map((_, index) => (
			<span className="select-none text-zinc-600 dark:text-zinc-400" key={index}>
				{index + 1}
			</span>
		))
	})
	LineNumbers.displayName = 'LineNumbers'

	return (
		<div ref={editorRef} className="shrink-0 grow-0 basis-1/2 overflow-auto font-mono text-sm">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{}</h1>
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
					onChange={e => {
						setContent(e.target.value)
					}}
					onKeyDown={handleKeyDown}
					wrap="off"
					value={content}
					aria-label="Markdown Input"
				/>
			</div>
		</div>
	)
}
