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
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import { editorStore } from "../stores/editor";
import { useSelector } from "@xstate/store/react";
import { AutosaveProps, useAutosave } from "#/routes/home/file";
import { useParams } from "react-router";
import { Fragment } from "react";
import { createToaster, Toast, Toaster } from "@ark-ui/react";
import { XIcon } from "lucide-react";

const toaster = createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 24,
});

function AutosavePlugin<TData, TReturn>({
  element = null,
  ...props
}: AutosaveProps<TData, TReturn>) {
  useAutosave(props);
  return element;
}

function Placeholder() {
  return <div className="editor-placeholder">Start writing...</div>;
}

export function Editor() {
  const content = useSelector(editorStore, (state) => state.context.content);
  const params = useParams();

  const onChange = (_: EditorState, editor: LexicalEditor) => {
    editor.read(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      if (!markdown) return;

      editorStore.send({ type: "setContent", content: markdown });
    });
  };

  return (
    <Fragment>
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
            <AutosavePlugin
              data={content}
              onSave={() => {
                editorStore.send({
                  type: "updateFile",
                  id: params.id,
                  content,
                });
                toaster.create({
                  title: "Success",
                  description: "File saved successfully",
                  type: "success",
                });
              }}
            />
          </div>
        </div>
      </LexicalComposer>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.CloseTrigger>
              <XIcon className="icon" />
            </Toast.CloseTrigger>
            <Toast.Description>{toast.description}</Toast.Description>
          </Toast.Root>
        )}
      </Toaster>
    </Fragment>
  );
}
