'use client'

import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'

export function Editor() {
  const [doc, setDoc] = useAtom(markdownAtom)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setDoc(e.target.value)
  }

  return (
    <>
      <label htmlFor="markdown-editor" className="sr-only">
        Markdown Editor
      </label>
      <textarea
        id="markdown-editor"
        name="markdown-editor"
        className="h-full shrink-0 grow-0 basis-1/2 resize-none overflow-y-auto border-none bg-background focus:border-none active:border-none outline-none font-mono text-sm pl-2 pt-2"
        onChange={handleChange}
        value={doc}
      />
    </>
  )
}
