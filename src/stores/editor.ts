import { createStore, StoreSnapshot } from "@xstate/store";

export type EditorContext = {
  content: string | ArrayBuffer | null;
  title: string;
  contents: {
    id: string;
    content: string | ArrayBuffer | null;
    title: string;
  }[];
};

export function persist<T>(state: StoreSnapshot<T>) {
  localStorage.setItem("editor", JSON.stringify(state));
}

export function getPersistedState<T>(): StoreSnapshot<T> | null {
  if (typeof window === "undefined") {
    return null;
  }
  const persisted = localStorage.getItem("editor");
  return persisted ? JSON.parse(persisted) : null;
}

const restoredState = getPersistedState<EditorContext>();
export const editorStore = createStore({
  context:
    restoredState?.context ??
    ({
      content: null,
      title: "",
      contents: [],
    } as EditorContext),
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
      },
    ) => {
      return {
        ...context,
        contents: events.contents,
      };
    },
    updateFile: (
      context,
      event: { id: string | undefined; content: string | ArrayBuffer | null },
    ) => {
      return {
        ...context,
        contents: context.contents.map((file) => {
          if (file.id === event.id) {
            return {
              ...file,
              content: event.content,
            };
          }
          return file;
        }),
      };
    },
  },
});

editorStore.subscribe((state) => {
  persist(state);
});
