import React, { useState } from "react";
import { Editor } from "./components/Editor";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import "./App.css";

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
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setContent(fileReader.result);
    };
  };

  const onNewFile = () => {
    setContent("");
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          justifyContent: "center",
          height: "100dvh",
        }}
      >
        {!content && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid #1a1a1a",
              padding: 8,
              borderRadius: 8,
            }}
          >
            <span
              style={{
                marginBottom: 16,
                fontSize: 16,
                fontWeight: "bold",
                color: "#efefef",
              }}
            >
              Open a file or create a new one to get started
            </span>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <button onClick={onOpenFile}>Open File</button>
              <button onClick={onNewFile}>New File</button>
            </div>
          </div>
        )}
        {content && (
          <Editor
            config={{
              namespace: "home",
              editorState: () => {
                $convertFromMarkdownString(content.toString(), TRANSFORMERS);
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
      </div>
    </React.Fragment>
  );
}
