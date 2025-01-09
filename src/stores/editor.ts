import { createStore } from "@xstate/store";

export const editorStore = createStore({
  context: {
    content: null as string | ArrayBuffer | null,
    title: "" as string,
    contents: [] as {
      id: string;
      content: string | ArrayBuffer | null;
      title: string;
    }[],
  },
  on: {
    setContent: (context, event: { content: string | ArrayBuffer | null }) => {
      return {
        ...context,
        content: event.content,
      };
    },
    setTitle: (context, event: { title: string }) => {
      return {
        ...context,
        title: event.title,
      };
    },
    setContents: (
      context,
      events: {
        contents: {
          id: string;
          content: string | ArrayBuffer | null;
          title: string;
        }[];
      }
    ) => {
      return {
        ...context,
        contents: events.contents,
      };
    },
  },
});
