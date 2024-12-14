import React, { createContext, useState } from "react";
import { Editor } from "../components/Editor";

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

export const EditorContext = createContext<{
  content: string | ArrayBuffer | null;
}>({
  content: null,
});
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

  const onSaveFile = async () => {
    const fileHandle = await window.showSaveFilePicker({
      types: [
        {
          description: "Markdown File",
          accept: { "text/markdown": [".md"] },
        },
      ],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(content as string);
    await writable.close();
  };

  return (
    <EditorContext value={{ content }}>
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
                <button type="button" onClick={onOpenFile}>
                  Open File
                </button>
                <button type="button" onClick={onNewFile}>
                  New File
                </button>
              </div>
            </div>
          )}
          <button type="button" onClick={onSaveFile}>
            Save File
          </button>
          {content !== null && <Editor />}
        </div>
      </React.Fragment>
    </EditorContext>
  );
}
