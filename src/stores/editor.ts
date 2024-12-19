import { create } from "zustand";

export type MarkdownFile = string | ArrayBuffer | null;

type State = {
  content: MarkdownFile;
};

type Actions = {
  setContent: (content: State["content"]) => void;
};

export const useEditorStore = create<State & Actions>((set) => ({
  content: null,
  setContent: (content) => set(() => ({ content: content }) ),
}));
