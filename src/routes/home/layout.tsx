import { useSelector } from "@xstate/store/react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Menu } from "@ark-ui/react";
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
    localStorage.setItem("editor", JSON.stringify(editorStore.getSnapshot()));
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
        <Menu.Root>
          <Menu.Trigger className="menu-button" title="Open Menu">
            <MenuIcon size={16} />
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className="menu">
              <Menu.Item
                className="menu-item"
                onClick={() => {
                  onNewFile();
                }}
                value="new-item"
              >
                <span className="icon">
                  <FilePlusIcon size={16} />
                </span>
                <span className="text">New File</span>
              </Menu.Item>
              <Menu.Item
                className="menu-item"
                value="open-file"
                onClick={() => onOpenFile()}
              >
                <span className="icon">
                  <FileUpIcon size={16} />
                </span>
                <span className="text">Open File</span>
              </Menu.Item>
              <Menu.Item
                className="menu-item"
                value="save-file"
                onClick={() => onSaveFile()}
              >
                <span className="icon">
                  <SaveIcon size={16} />
                </span>
                <span className="text">Save File</span>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
        <Link to="/" replace viewTransition className="sidebar-item">
          <span className="icon">
            <HomeIcon size={16} />
          </span>
          <span>Home</span>
        </Link>
        {contents.length > 0 &&
          contents.map((c) => (
            <Menu.Root key={c.id}>
              <Menu.ContextTrigger asChild>
                <Link viewTransition to={`/${c.id}`} className="sidebar-item">
                  <span className="icon">
                    <FileIcon size={16} />
                  </span>
                  <span>{c.title}</span>
                </Link>
              </Menu.ContextTrigger>
              <Menu.Positioner>
                <Menu.Content className="menu">
                  <Menu.Item className="menu-item" value="delete-file">
                    Delete
                  </Menu.Item>
                  <Menu.Item className="menu-item" value="rename-file">
                    Rename
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          ))}
      </Panel>
      <PanelResizeHandle className="resize-panel" />
      <Panel className="main" id="main" minSize={80}>
        <Outlet />
      </Panel>
    </PanelGroup>
  );
}
