'use client'

import CodeMirror from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes'
import { markdown } from '@codemirror/lang-markdown'
import { useCallback } from 'react'
import { useEditor } from '.'
import { tags } from '@lezer/highlight'
import { trpc } from '@/lib/trpc'

const defaultTheme = createTheme({
	theme: 'dark',
	settings: {
		fontFamily: 'var(--font-foboto-mono), monospace',
		background: '#0A0A0A',
		gutterBackground: '#0a0a0a',
		gutterForeground: '#a3a3a3',
		lineHighlight: '#171717',
	},
	styles: [
		{
			tag: tags.heading1,
			fontSize: '2.25em',
			fontWeight: '700',
		},
		{
			tag: tags.heading2,
			fontSize: '1.5em',
			fontWeight: '700',
		},
		{
			tag: tags.heading3,
			fontSize: '1.25em',
			fontWeight: '600',
		},
		{
			tag: tags.heading4,
			fontWeight: '600',
		},
	],
})

interface EditorProps {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
	id: string
}

export function Editor({ editorRef, id }: EditorProps) {
	const { content, dispatch } = useEditor()
	const { mutate } = trpc.updateDraftContent.useMutation()
	const onChange = useCallback(
		(value: string) => {
			dispatch({ type: 'UPDATE_CONTENT', content: value })

			setTimeout(() => {
				mutate({ id, content: value })
			}, 1000)
		},
		[dispatch],
	)

	return (
		<div ref={editorRef} className="shrink-0 grow-0 basis-1/2 overflow-auto font-mono text-sm">
			<CodeMirror
				className="h-full"
				value={content}
				theme={defaultTheme}
				onChange={onChange}
				extensions={[markdown()]}
			/>
		</div>
	)
}
