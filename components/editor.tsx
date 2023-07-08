'use client'

import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'
import { memo, useMemo, useRef } from 'react'

export function Editor({
	editorRef,
}: {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
}) {
	const [doc, setDoc] = useAtom(markdownAtom)
	const textAreaRef = useRef<HTMLTextAreaElement>(null)

	const lineNumber = useMemo(() => doc.split('\n').length, [doc])
	const longestString = useMemo(
		() =>
			doc.split('\n').reduce((a, b) => (a.length > b.length ? a : b))
				.length,
		[doc],
	)

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		e.preventDefault()
		setDoc(e.target.value)
	}

	const insertTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textArea = textAreaRef.current!
		const start = textArea.selectionStart
		const end = textArea.selectionEnd

		textArea.value =
			textAreaRef.current?.value.substring(0, start) +
			'\t' +
			textAreaRef.current?.value.substring(end)

		e.preventDefault()
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		switch (e.key) {
			case 'Tab':
				insertTab(e)
		}
	}

	const LineNumbers = memo(() => {
		return Array.from({ length: lineNumber }).map((_, index) => (
			<span className="select-none" key={index}>
				{index + 1}
			</span>
		))
	})
	LineNumbers.displayName = 'LineNumbers'

	return (
		<div
			ref={editorRef}
			className="shrink-0 grow-0 basis-1/2 overflow-auto font-mono text-sm">
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
					value={doc}
					aria-label="Markdown Input"
				/>
			</div>
		</div>
	)
}
