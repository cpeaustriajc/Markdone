import { useRef, useState, useEffect, MutableRefObject } from 'react'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { bracketMatching, indentOnInput } from '@codemirror/language'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'

type Props = {
  initialDoc: string
  onChange: (state: EditorState) => void
}

export function useCodeMirror<T extends Element>(
  props: Props
): [MutableRefObject<T | null>, EditorView?] {
  const ref = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!ref.current) return

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          addKeymap: true,
        }),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
      ],
    })
    const view = new EditorView({
      state: startState,
      parent: ref.current,
    })
    setEditorView(view)

    return () => {
      view.destroy()
    }
  }, [ref])

  return [ref, editorView]
}
