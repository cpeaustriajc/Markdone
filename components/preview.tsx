'use client'

import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'

type Props = {
  doc: string
}
export const Preview = (props: Props) => {
  const { doc } = props

  return (
    <ReactMarkdown
      children={doc}
      remarkPlugins={[[remarkGfm, { tableCellPadding: true }]]}
      className="prose h-full max-w-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden border-l border-gray-400 pl-3 dark:prose-invert"
    />
  )
}

export default Preview
