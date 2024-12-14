import React, { useState } from "react";
import { Editor } from "./components/Editor";
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
          height: "100dvh",
        }}
      >
        {content === null && (
          <div>
            <span>Open a file or create a new one to get started</span>
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
        {content !== null && <Editor />}
      </div>
    </React.Fragment>
  );
}
