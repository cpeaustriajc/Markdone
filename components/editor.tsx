'use client'

import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'
import { useRef } from 'react'

export function Editor() {
  const [doc, setDoc] = useAtom(markdownAtom)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDoc(e.target.value)
  }

  const computeLineCount = (): number => {
    if (textAreaRef.current) {
      const { value, rows } = textAreaRef.current
      if (value) {
        return Math.max(value.split('\n').length, rows)
      }
      return rows
    }
    return 1
  }

  const LineNumbers = () => {
    return Array.from({ length: computeLineCount() }).map((_, index) => (
      <span key={index}>{index + 1}</span>
    ))
  }

  return (
    <div className="shrink-0 grow-0 basis-1/2  font-mono text-sm">
      <label htmlFor="markdown-editor" className="sr-only">
        Markdown Editor
      </label>
      <div className="flex w-full flex-row">
        <div className="flex h-fit w-8 flex-col items-end border-r px-2">
          <LineNumbers />
        </div>
        <textarea
          ref={textAreaRef}
          id="markdown-editor"
          name="markdown-editor"
          className="w-full resize-none overflow-x-auto break-keep bg-background pl-1 outline-none focus:border-none active:border-none"
          onChange={handleChange}
          wrap="off"
          value={doc}
        />
      </div>
    </div>
  )
}
