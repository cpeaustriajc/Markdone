import { useRef, useState, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import { bracketMatching, indentOnInput } from '@codemirror/language'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags } from '@lezer/highlight'

type Props = {
  initialDoc: string
  onChange: (state: EditorState) => void
}

const markdownSyntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading2,
    fontSize: '1.25em',
    fontWeight: 'bold',
  },
  {
    tag: tags.heading3,
    fontSize: '1.125em',
    fontWeight: 'bold',
  },
])

export function useCodeMirror<T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] {
  const ref = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!ref.current) return

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        lineNumbers(),
        highlightActiveLineGutter(),
        history(),
        indentOnInput(),
        bracketMatching(),
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          addKeymap: true,
        }),
        syntaxHighlighting(markdownSyntaxHighlighting),
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
