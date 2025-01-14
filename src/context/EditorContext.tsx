import {
  createContext,
  Dispatch,
  PropsWithChildren,
  startTransition,
  useReducer,
} from "react";

type State = Array<{
  id: string;
  title: string;
  content: string;
}>;

type Action =
  | { type: "CREATE_FILE" }
  | { type: "OPEN_FILE" }
  | { type: "UPDATE_FILE" }
  | { type: "DELETE_FILE" };

const pickerOpts: OpenFilePickerOptions = {
  types: [
    {
      description: "Markdown File",
      accept: { "text/markdown": [".md"] },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};
const initialState: State = [];

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "CREATE_FILE": {
      const newFile = {
        id: window.crypto.randomUUID(),
        title: "Untitled",
        content: "",
      };
      return [...state, newFile];
    }
    case "UPDATE_FILE": {
      startTransition(async () => {
        // const fileHandle = await window.showSaveFilePicker(pickerOpts);
        // const writable = await fileHandle.createWritable();
        // await writable.write(state as string);
        // await writable.close();
      });
      return state;
    }
    case "OPEN_FILE": {
      startTransition(async () => {
        const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
        const file = await fileHandle.getFile();
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {};
      });
      return state;
    }
    default:
      return state;
  }
}

export const EditorStateContext = createContext<State | null>(null);

export const EditorDispatchContext = createContext<{
  dispatch: Dispatch<Action>;
} | null>(null);

export function EditorContext({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EditorStateContext value={state}>
      <EditorDispatchContext value={{ dispatch }}>
        {children}
      </EditorDispatchContext>
    </EditorStateContext>
  );
}
