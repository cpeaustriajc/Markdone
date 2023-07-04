'use client'

import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { useMarkdownFile } from '@/hooks/use-markdownfile'

export function Preview() {
  const doc = useMarkdownFile((state) => state.markdownFile)

  return (
    <ReactMarkdown
      children={doc}
      remarkPlugins={[[remarkGfm, { tableCellPadding: true }]]}
      className="prose h-full max-w-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
    />
  )
}
