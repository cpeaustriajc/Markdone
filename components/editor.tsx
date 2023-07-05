'use client'

import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'
import {
  memo,
  useMemo,
  useRef,
} from 'react'

export function Editor() {
  const [doc, setDoc] = useAtom(markdownAtom)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const lineNumber = useMemo(() => doc.split('\n').length, [doc])
  const longestString = useMemo(
    () =>
      doc.split('\n').reduce((a, b) => (a.length > b.length ? a : b)).length,
    [doc]
  )

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDoc(e.target.value)
  }

  const insertTab = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textArea = textAreaRef.current!
    const start = textArea.selectionStart
    const end = textArea.selectionEnd

    textArea.value =
      textAreaRef.current?.value.substring(0, start) +
      '\t' +
      textAreaRef.current?.value.substring(end)

    e.preventDefault()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    switch (e.key) {
      case 'Tab':
        insertTab(e)
    }
  }

  const LineNumbers = memo(() => {
    return Array.from({ length: lineNumber }).map((_, index) => (
      <span className="select-none" key={index}>
        {index + 1}
      </span>
    ))
  })

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
          cols={longestString}
          rows={lineNumber}
          className="w-full resize-none overflow-x-auto break-keep bg-background pl-1 outline-none focus:border-none active:border-none"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          wrap="off"
          value={doc}
        >
        </textarea>
      </div>
    </div>
  )
}
