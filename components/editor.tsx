'use client'

import { EditorState } from '@codemirror/state'
import { useCallback, useEffect, useState } from 'react'
import { useCodeMirror } from '@/hooks/use-codemirror'

interface Props {
  doc: string
}

export const Editor: React.FC<Props> = (props) => {
  const { doc } = props

  const [currentDoc, setCurrentDoc] = useState<string>(doc)

  const handleChange = useCallback(
    (state: EditorState) => setCurrentDoc(state.doc.toString()),
    [setCurrentDoc]
  )
  const [editorRef, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: currentDoc,
    onChange: handleChange,
  })

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: currentDoc,
        },
      })
    }
  }, [editorView])

  return (
    <div
      ref={editorRef}
      className="h-full basis-1/2 grow-0 shrink-0 overflow-y-auto"
    />
  )
}
