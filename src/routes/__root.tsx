import { createRootRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "#/components/Sidebar";
import { EditorContext } from "#/context/EditorContext";
import { Splitter } from "@ark-ui/react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <EditorContext>
      <Splitter.Root
        className="home"
        defaultSize={[
          {
            id: "sidebar",
            size: 15,
          },
          {
            id: "main",
            size: 85,
          },
        ]}
        orientation="horizontal"
      >
        <Splitter.Panel className="sidebar" id="sidebar">
          <Sidebar />
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="sidebar:main" className="resize-panel" />
        <Splitter.Panel className="main" id="main">
          <Outlet />
        </Splitter.Panel>
      </Splitter.Root>
    </EditorContext>
  );
}
