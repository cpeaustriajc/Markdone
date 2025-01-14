import {
  EditorDispatchContext,
  EditorStateContext,
} from "#/context/EditorContext";
import { Editable, Menu } from "@ark-ui/react";
import { Link } from "@tanstack/react-router";
import {
  FileIcon,
  FilePlusIcon,
  FileUpIcon,
  HomeIcon,
  MenuIcon,
  SaveIcon,
} from "lucide-react";
import { Fragment, use } from "react";

export function Sidebar() {
  const files = use(EditorStateContext);
  const editorDispatch = use(EditorDispatchContext);

  if (!files) {
    throw new Error("EditorStateContext is not provided");
  }

  if (!editorDispatch) {
    throw new Error("EditorDispatchContext is not provided");
  }

  return (
    <Fragment>
      <Menu.Root>
        <Menu.Trigger className="menu-button" title="Open Menu">
          <MenuIcon size={16} />
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content className="menu">
            <Menu.Item
              className="menu-item"
              onClick={() => editorDispatch.dispatch({ type: "CREATE_FILE" })}
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
              onClick={() => editorDispatch.dispatch({ type: "OPEN_FILE" })}
            >
              <span className="icon">
                <FileUpIcon size={16} />
              </span>
              <span className="text">Open File</span>
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              value="save-file"
              onClick={() => editorDispatch.dispatch({ type: "UPDATE_FILE" })}
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
      {files.map((c) => (
        <Menu.Root key={c.id}>
          <Menu.ContextTrigger asChild>
            <Link to={`/$id`} params={{ id: c.id }} className="sidebar-item">
              <span className="icon">
                <FileIcon size={16} />
              </span>
              <Editable.Root
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
            </Link>
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
    </Fragment>
  );
}
