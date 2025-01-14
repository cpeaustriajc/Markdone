import { createStore, StoreSnapshot } from "@xstate/store";

export type EditorContext = {
  id: string;
  content: string | ArrayBuffer | null;
  title: string;
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

const restoredState = getPersistedState<EditorContext[]>();

export const editorStore = createStore({
  context: { files: restoredState?.context ?? ([] as EditorContext[]) },
  on: {
    updateContent: (
      context,
      event: { id: string; content: string | ArrayBuffer | null },
    ) => {
      return {
        files: context.files.map((file) => {
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
    updateTitle: (context, event: { id: string; title: string }) => {
      return {
        files: context.files.map((file) => {
          if (file.id === event.id) {
            return {
              ...file,
              title: event.title,
            };
          }

          return file;
        }),
      };
    },
    createFile: (context, events: { file: EditorContext }) => {
      return {
        ...context,
        files: context.files.concat(events.file),
      };
    },
  },
});

editorStore.subscribe((state) => {
  persist(state);
});
