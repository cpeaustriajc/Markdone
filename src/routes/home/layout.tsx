import { useEditorStore } from "#/stores/editor";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { MdAdd, MdFileDownload, MdFileOpen, MdMenu } from "react-icons/md";
import { Menu, MenuProvider, MenuButton, MenuItem } from "@ariakit/react/menu";
import { Outlet } from "react-router";

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

export default function HomeLayout() {
  const { content, setContent, setTitle, contents, setContents } =
    useEditorStore();

  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setContent(fileReader.result);
      document.title = file.name;
      setTitle(file.name);

      setContents([
        ...contents,
        {
          id: crypto.randomUUID(),
          content: fileReader.result,
          title: file.name,
        },
      ]);
    };
  };

  const onNewFile = () => {
    setContent("");
    document.title = "New File";
    setTitle("New File");

    setContents([
      ...contents,
      {
        id: crypto.randomUUID(),
        content: "",
        title: "New File",
      },
    ]);
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
      <Panel className="sidebar" id="sidebar" minSize={15} maxSize={20}>
        <MenuProvider>
          <MenuButton className="button">
            <MdMenu className="icon" />
          </MenuButton>
          <Menu className="menu">
            <MenuItem
              className="menu-button"
              onClick={() => {
                onNewFile();
              }}
            >
              <MdAdd className="icon" />
              New File
            </MenuItem>
            <MenuItem className="menu-button" onClick={() => onOpenFile}>
              <MdFileOpen className="icon" />
              Open File
            </MenuItem>
            <MenuItem className="menu-button" onClick={() => onSaveFile()}>
              <MdFileDownload className="icon" />
              Save File
            </MenuItem>
          </Menu>
        </MenuProvider>
        {contents.length > 0 &&
          contents.map((c) => (
            <div className="sidebar-item" key={c.id}>
              {c.title}
            </div>
          ))}
      </Panel>
      <PanelResizeHandle className="resize-panel" />
      <Panel className="main" id="main" minSize={80}>
        <Outlet />
      </Panel>
    </PanelGroup>
  );
}
