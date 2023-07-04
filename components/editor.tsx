'use client'

import { EditorState } from '@codemirror/state'
import { useCallback, useEffect, useState } from 'react'
import { useCodeMirror } from '@/hooks/use-codemirror'
import { useMarkdownFile } from '@/hooks/use-markdownfile'

export function Editor() {
  const doc = useMarkdownFile((state) => state.markdownFile)
  const updateContent = useMarkdownFile((state) => state.updateContent)

  const handleChange = useCallback(
    (state: EditorState) => updateContent(state.doc.toString()),
    [updateContent]
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
