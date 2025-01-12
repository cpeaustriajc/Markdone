import { createStore, StoreSnapshot } from "@xstate/store";

type EditorContext = {
  content: string | ArrayBuffer | null;
  title: string;
  contents: {
    id: string;
    content: string | ArrayBuffer | null;
    title: string;
  }[];
};

function persist<T>(state: StoreSnapshot<T>) {
  localStorage.setItem("editor", JSON.stringify(state));
}

function getPersistedState<T>(): StoreSnapshot<T> | null {
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
  },
});

editorStore.subscribe((state) => {
  persist(state);
});
