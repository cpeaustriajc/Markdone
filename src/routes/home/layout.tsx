import { useSelector } from "@xstate/store/react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Editable, Menu } from "@ark-ui/react";
import { Fragment } from "react";
import { NavLink, Outlet, useParams } from "react-router";
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
  const params = useParams();
  const content = useSelector(
    editorStore,
    (state) =>
      params.id && state.context.files.find((c) => c.id === params.id)?.content,
  );
  const contents = useSelector(editorStore, (state) => state.context);

  const onOpenFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {};
  };

  const onNewFile = () => {
    document.title = "New File";
    editorStore.send({
      type: "createFile",
      file: {
        id: "new-file",
        content: "",
        title: "New File",
      },
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
      <Panel
        className="sidebar"
        id="sidebar"
        defaultSize={15}
        minSize={15}
        maxSize={20}
      >
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
        <NavLink to="/" replace viewTransition className="sidebar-item">
          <span className="icon">
            <HomeIcon size={16} />
          </span>
          <span>Home</span>
        </NavLink>
        {contents.files.length > 0 &&
          contents.files.map((c) => (
            <Menu.Root key={c.id}>
              <Menu.ContextTrigger asChild>
                <NavLink
                  viewTransition
                  to={`/${c.id}`}
                  className="sidebar-item"
                >
                  <span className="icon">
                    <FileIcon size={16} />
                  </span>
                  <Editable.Root
                    onValueCommit={(title) => {
                      editorStore.send({
                        type: "updateTitle",
                        id: c.id,
                        title: title.value,
                      });
                    }}
                    style={{
                      display: "flex",
                      flex: "1 0 auto",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    defaultValue={c.title}
                  >
                    <Editable.Area>
                      <Editable.Input
                        style={{
                          border: "none",
                          background: "transparent",
                          fontFamily: "inherit",
                        }}
                      />
                      <Editable.Preview />
                    </Editable.Area>
                    <Editable.Context>
                      {(editable) => (
                        <Editable.Control
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                          }}
                        >
                          {editable.editing ? (
                            <Fragment>
                              <Editable.SubmitTrigger className="button">
                                Save
                              </Editable.SubmitTrigger>
                              <Editable.CancelTrigger className="button">
                                Cancel
                              </Editable.CancelTrigger>
                            </Fragment>
                          ) : (
                            <Editable.EditTrigger className="button">
                              Edit
                            </Editable.EditTrigger>
                          )}
                        </Editable.Control>
                      )}
                    </Editable.Context>
                  </Editable.Root>
                </NavLink>
              </Menu.ContextTrigger>
              <Menu.Positioner>
                <Menu.Content className="menu">
                  <Menu.Item className="menu-item" value="rename-file">
                    Rename
                  </Menu.Item>
                  <Menu.Item className="menu-item" value="delete-file">
                    Delete
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu.Root>
          ))}
      </Panel>
      <PanelResizeHandle className="resize-panel" />
      <Panel className="main" id="main" defaultSize={85} minSize={80}>
        <Outlet />
      </Panel>
    </PanelGroup>
  );
}
