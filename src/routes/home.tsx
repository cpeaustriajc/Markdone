import { Editor } from "../components/Editor";
import { useEditorStore } from "../stores/editor";
import { Route } from "../+types/root";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";

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

export const meta: Route.MetaFunction = () => [
  {
    title: "Home",
  },
];

export default function Home() {
  const content = useEditorStore((state) => state.content);
  const setContent = useEditorStore((state) => state.setContent);

  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setContent(fileReader.result);
      document.title = file.name;
    };
  };

  const onNewFile = () => {
    setContent("");
    document.title = "New File";
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
    <PanelGroup className="home" direction="horizontal">
      <Panel className="sidebar" id="sidebar">
        <button type="button" onClick={onNewFile}>
          New File
        </button>
        <button type="button" onClick={onOpenFile}>
          Open File
        </button>
        <button type="button" disabled={content === null} onClick={onSaveFile}>
          Save File
        </button>
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <main className="main">
          <Editor />
        </main>
      </Panel>
    </PanelGroup>
  );
}
