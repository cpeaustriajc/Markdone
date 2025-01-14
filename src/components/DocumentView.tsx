import { Editor } from "#/components/Editor";
import { useSyncExternalStore } from "react";
import { editorStore } from "#/stores/editor";
import { useSelector } from "@xstate/store/react";
import { useParams } from "react-router";

export default function DocumentView() {
  const params = useParams();
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
