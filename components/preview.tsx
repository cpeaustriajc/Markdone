'use client'

import { DraftResponseSuccess, getDraft } from '@/lib/supabase'
import { Fragment, ReactNode, createElement, useEffect, useState } from 'react'
import rehypeReact from 'rehype-react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

interface PreviewProps {
	previewRef: React.MutableRefObject<HTMLDivElement | null>
	id: string
}

export function Preview({ previewRef, id }: PreviewProps) {
	const [draft, setDraft] = useState<DraftResponseSuccess>()

	useEffect(() => {
		getDraft(id).then(res => setDraft(res.data))
	}, [setDraft, id])

	const md = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeReact, { createElement, Fragment })
		.processSync(draft?.content!).result as ReactNode

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
