'use client'

import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'

export function Preview() {
  const [doc] = useAtom(markdownAtom)

  return (
    <ReactMarkdown
      children={doc}
      remarkPlugins={[[remarkGfm, { tableCellPadding: true }]]}
      className="prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
    />
  )
}
