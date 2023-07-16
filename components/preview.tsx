'use client'

import { useDrafts } from '@/context/drafts-context'
import { Fragment, ReactNode, createElement } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeReact from 'rehype-react'

export function Preview({ previewRef }: { previewRef: React.MutableRefObject<HTMLDivElement | null> }) {
	const { state } = useDrafts()

	const md = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeReact, { createElement, Fragment })
		.processSync(state.drafts.find(draft => draft.id === 1)?.content ?? '').result as ReactNode
	return (
		<div
			ref={previewRef}
			className="prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
			role="region"
			aria-label="Preview">
				{md}
		</div>
	)
}
