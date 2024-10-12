import React, { useState } from "react";
import { Editor } from "./components/Editor";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";

const pickerOpts: OpenFilePickerOptions = {
  types: [
    {
      description: "Markdown File",
      accept: { "text/markdown": [".md"] },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

const EDITOR_NODES = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  LinkNode,
];

export default function Home() {
  const [content, setContent] = useState<string | undefined>(undefined);
  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setContent(fileReader.result as string);
    };
  };

  const onNewFile = () => {
    setContent("");
  };
  return (
    <React.Fragment>
      {!content && (
        <div
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "center",
            height: "100%",
          }}
        >
          <span>Open a file to Get Started</span>
          <button onClick={onOpenFile}>Open File</button>
          <button onClick={onNewFile}>New File</button>
        </div>
      )}
      {content && (
        <Editor
          config={{
            namespace: "home",
            editorState: () => {
              $convertFromMarkdownString(content, TRANSFORMERS);
            },
            nodes: EDITOR_NODES,
            theme: {
              root: "editor-root",
            },
            onError: (error) => {
              console.log(error);
            },
          }}
        />
      )}
    </React.Fragment>
  );
}
