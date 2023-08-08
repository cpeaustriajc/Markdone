'use client'

import CodeMirror from '@uiw/react-codemirror'
import { githubDark } from '@uiw/codemirror-theme-github'
import { markdown } from '@codemirror/lang-markdown'
import { useCallback } from 'react'
import { useEditor } from '.'

interface EditorProps {
	editorRef: React.MutableRefObject<HTMLDivElement | null>
}

export function Editor({ editorRef }: EditorProps) {
	const { content, dispatch } = useEditor()

	const onChange = useCallback(
		(value: string) => {
			dispatch({ type: 'UPDATE_CONTENT', content: value })
		},
		[dispatch],
	)

	return (
		<div ref={editorRef} className="shrink-0 grow-0 basis-1/2 overflow-auto font-mono text-sm">
			<CodeMirror className="h-full" value={content} theme={githubDark} onChange={onChange} extensions={[markdown()]} />
		</div>
	)
}
