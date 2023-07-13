'use client'

import { useDrafts } from '@/context/drafts-context'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Preview({ previewRef }: { previewRef: React.MutableRefObject<HTMLDivElement | null> }) {
	const {state, dispatch} = useDrafts()

	return (
		<div
			ref={previewRef}
			className="prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
			role="region"
			aria-label="Preview">
			<ReactMarkdown remarkPlugins={[[remarkGfm, { tableCellPadding: true }]]}>{state.drafts.find(draft => draft.id === '1')?.content ?? ''}</ReactMarkdown>
		</div>
	)
}
