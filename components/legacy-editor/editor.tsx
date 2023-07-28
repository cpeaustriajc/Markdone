'use client'

import { useRef, memo, Dispatch, SetStateAction, ElementRef } from 'react'

interface EditorProps {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
	content: string
	setContent: Dispatch<SetStateAction<string>>
}

export function Editor({ editorRef, content, setContent }: EditorProps) {
	const textAreaRef = useRef<ElementRef<'textarea'>>(null)

	const lineNumber = content.split('\n').length
	const longestString = content.split('\n').reduce((a, b) => (a.length > b.length ? a : b)).length

	const handleChange = async (e: React.ChangeEvent<ElementRef<'textarea'>>) => {
		e.preventDefault()

		setContent(e.target.value)
	}

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
			<span className="select-none dark:text-zinc-400 text-zinc-600" key={index}>
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
					value={content}
					aria-label="Markdown Input"
				/>
			</div>
		</div>
	)
}
