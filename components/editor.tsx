'use client'

import { EditorState } from '@codemirror/state'
import { useCallback, useEffect } from 'react'
import { useCodeMirror } from '@/hooks/use-codemirror'
import { markdownAtom } from '@/app/store'
import { useAtom } from 'jotai'

export function Editor() {
  const [doc, setDoc] = useAtom(markdownAtom)

  const handleChange = useCallback(
    (state: EditorState) => setDoc(state.doc.toString()),
    [setDoc]
  )
  const [editorRef, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: doc,
    onChange: handleChange,
  })

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: doc,
        },
      })
    }
  }, [editorView])

  return (
    <div
      ref={editorRef}
      className="h-full shrink-0 grow-0 basis-1/2 overflow-y-auto"
    />
  )
}
