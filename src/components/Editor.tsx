import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { TRANSFORMERS } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";

type EditorProps = {
  config: Parameters<typeof LexicalComposer>["0"]["initialConfig"];
};

export function Editor(props: EditorProps) {
  return (
    <LexicalComposer initialConfig={props.config}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              aria-placeholder="Start writing..."
              placeholder={<div className="editor">Start writing...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
}
