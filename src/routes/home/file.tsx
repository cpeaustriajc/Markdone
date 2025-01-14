import { Editor } from "#/components/Editor";
import { useSyncExternalStore } from "react";
import { Route } from "./+types";
import { editorStore } from "#/stores/editor";
import { useSelector } from "@xstate/store/react";

export const meta: Route.MetaFunction = () => [
  {
    title: "Home",
  },
  {
    name: "color-scheme",
    content: "dark light",
  },
];

export async function clientLoader({ params }: Route.LoaderArgs) {
  return {
    params,
  };
}

export default function Home({ params }: Route.ComponentProps) {
  const content = useSelector(editorStore, (state) =>
    state.context.files.find((file) => file.id === params.id),
  );

  if (!content) {
    throw new Error("File not found");
  }

  useSyncExternalStore(
    () => {
      document.title = content.title;

      return () => {
        document.title = "Markdone";
      };
    },
    () => document.title,
  );

  return <Editor />;
}
