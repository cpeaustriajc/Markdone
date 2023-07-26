'use client'

import { Fragment, ReactNode, createElement } from 'react'
import rehypeReact from 'rehype-react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

interface PreviewProps {
	previewRef: React.MutableRefObject<HTMLDivElement | null>
	content: string
}

export async function Preview({ previewRef, content }: PreviewProps) {
	const md = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeReact, { createElement, Fragment })
		.process(content)

	const Content = md.result as ReactNode

	return (
		<div
			ref={previewRef}
			className="prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
			role="region"
			aria-label="Preview">
			{Content}
		</div>
	)
}
