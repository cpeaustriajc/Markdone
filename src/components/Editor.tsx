import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { defaultTheme } from "../themes/defaultTheme";
import { useCallback } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import { useEditorStore } from "../stores/editor";

function Placeholder() {
  return <div className="editor-placeholder">Start writing...</div>;
}

export function Editor() {
  const { content, setContent } = useEditorStore();

  const onChange = useCallback((_: EditorState, editor: LexicalEditor) => {
    editor.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      if (!setContent || !markdown) return;

      setContent(markdown);
    });
  }, []);

  return (
    <LexicalComposer
      initialConfig={{
        editorState: () =>
          $convertFromMarkdownString(content?.toString() ?? ""),
        namespace: "main-editor",
        onError: (error) => {
          throw error;
        },
        theme: defaultTheme,
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          CodeNode,
          LinkNode,
          CodeHighlightNode,
        ],
      }}
    >
      <div className="editor-container">
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
