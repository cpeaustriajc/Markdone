import { createRouter, RouterProvider } from "@tanstack/react-router";
import * as ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root")!;

if (!root.innerHTML) {
  ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
}
