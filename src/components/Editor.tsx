import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { useContext } from "react";
import { defaultTheme } from "../themes/defaultTheme";
import { EditorContext } from "../routes/home";

function Placeholder() {
  return <div className="editor-placeholder">Start writing...</div>;
}

export function Editor() {
  const editorContext = useContext(EditorContext);
  return (
    <LexicalComposer
      initialConfig={{
        editorState: editorContext.content?.toString(),
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
        </div>
      </div>
    </LexicalComposer>
  );
}
