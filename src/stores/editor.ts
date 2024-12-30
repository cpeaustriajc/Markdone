import { create } from "zustand";

export type MarkdownFile = string | ArrayBuffer | null;

type EditorStoreState = {
  content: MarkdownFile;
  title: string | null;
  contents: Array<{
    id: string;
    content: EditorStoreState["content"];
    title: EditorStoreState["title"];
  }>;
};

type EditorStoreActions = {
  setContent: (content: EditorStoreState["content"]) => void;
  setTitle: (title: EditorStoreState["title"]) => void;
  setContents: (contents: EditorStoreState["contents"]) => void;
};

export const useEditorStore = create<EditorStoreState & EditorStoreActions>(
  (set) => ({
    content: null,
    setContent: (content) => set(() => ({ content: content })),
    title: null,
    setTitle: (title) => set(() => ({ title: title })),
    contents: [],
    setContents: (contents) => set(() => ({ contents: contents })),
  })
);
