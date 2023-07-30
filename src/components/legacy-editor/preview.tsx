import { Fragment, ReactNode, createElement } from 'react'
import rehypeReact from 'rehype-react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

interface PreviewProps {
	previewRef: React.MutableRefObject<HTMLDivElement | null>
	content: string | undefined
}

export function Preview({ previewRef, content = ''}: PreviewProps) {
	const md = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeReact, { createElement, Fragment })
		.processSync(content)

	const Content = md.result as ReactNode

	return (
		<article
			ref={previewRef}
			className="prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
			role="region"
			aria-label="Preview">
			{Content}
		</article>
	)
}
