'use client'

import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'

export function Preview({
  previewRef,
}: {
  previewRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const [doc] = useAtom(markdownAtom)

  return (
    <div
      ref={previewRef}
      className="prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert"
    >
      <ReactMarkdown remarkPlugins={[[remarkGfm, { tableCellPadding: true }]]}>
        {doc}
      </ReactMarkdown>
    </div>
  )
}
