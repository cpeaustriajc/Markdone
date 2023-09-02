'use client'

import CodeMirror from '@uiw/react-codemirror'
import { createTheme } from '@uiw/codemirror-themes'
import { markdown } from '@codemirror/lang-markdown'
import { tags } from '@lezer/highlight'
import { useDraftsStore } from '@/store/editor'
import { useToast } from '@/components/ui/use-toast'
import { startTransition, useEffect } from 'react'
import { updateContent } from '@/app/_actions/draft'
import { useDebounce } from '@/hooks/use-debounce'

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
	const { toast } = useToast()
	const { content, setContent } = useDraftsStore()
	const asyncContent = useDebounce(content, 5000)

	useEffect(() => {
		startTransition(() => {
			updateContent(id, asyncContent)
			console.log('rerendered')
		})

		toast({ title: 'File Saved!', description: 'Your file has been saved successfully.' })
	}, [asyncContent, id, toast])

	const onChange = (value: string) => {
		setContent(value)
	}

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
