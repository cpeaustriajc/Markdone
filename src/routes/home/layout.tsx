import { useSelector } from "@xstate/store/react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Menu, MenuProvider, MenuButton, MenuItem } from "@ariakit/react/menu";
import { Link, Outlet } from "react-router";
import { editorStore } from "#/stores/editor";
import {
  FileIcon,
  HomeIcon,
  FilePlusIcon,
  MenuIcon,
  FileUpIcon,
  SaveIcon,
} from "lucide-react";

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
  const content = useSelector(editorStore, (state) => state.context.content);
  const contents = useSelector(editorStore, (state) => state.context.contents);

  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      editorStore.send({ type: "setContent", content: fileReader.result });
      document.title = file.name;
      editorStore.send({ type: "setTitle", title: file.name });

      editorStore.send({
        type: "setContents",
        contents: [
          ...contents,
          {
            id: crypto.randomUUID(),
            content: fileReader.result,
            title: file.name,
          },
        ],
      });
    };
  };

  const onNewFile = () => {
    editorStore.send({ type: "setContent", content: "" });
    document.title = "New File";
    editorStore.send({ type: "setTitle", title: "New File" });

    editorStore.send({
      type: "setContents",
      contents: [
        ...contents,
        {
          id: crypto.randomUUID(),
          content: "",
          title: "New File",
        },
      ],
    });
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
          <MenuButton className="menu-button" title="Open Menu">
            <MenuIcon size={16} />
          </MenuButton>
          <Menu className="menu">
            <MenuItem
              className="menu-item"
              onClick={() => {
                onNewFile();
              }}
            >
              <span className="icon">
                <FilePlusIcon size={16} />
              </span>
              <span className="text">New File</span>
            </MenuItem>
            <MenuItem className="menu-item" onClick={() => onOpenFile}>
              <span className="icon">
                <FileUpIcon size={16} />
              </span>
              <span className="text">Open File</span>
            </MenuItem>
            <MenuItem className="menu-item" onClick={() => onSaveFile()}>
              <span className="icon">
                <SaveIcon size={16} />
              </span>
              <span className="text">Save File</span>
            </MenuItem>
          </Menu>
        </MenuProvider>
        <Link to="/" replace className="sidebar-item">
          <span className="icon">
            <HomeIcon size={16} />
          </span>
          <span>Home</span>
        </Link>
        {contents.length > 0 &&
          contents.map((c) => (
            <Link to={`/${c.id}`} className="sidebar-item" key={c.id}>
              <span className="icon">
                <FileIcon size={16}/>
              </span>
              <span>{c.title}</span>
            </Link>
          ))}
      </Panel>
      <PanelResizeHandle className="resize-panel" />
      <Panel className="main" id="main" minSize={80}>
        <Outlet />
      </Panel>
    </PanelGroup>
  );
}
