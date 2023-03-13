import { EditorState } from "@codemirror/state";
import { useCallback, useEffect } from "react";
import useCodeMirror from "../hooks/useCodeMirror";

interface Props {
  initialDoc: string;
  onChange: (newDoc: string) => void;
}

export const Editor: React.FC<Props> = (props) => {
  const { initialDoc, onChange } = props;
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );
  const [editorRef, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: initialDoc,
        },
      });
    }
  }, [editorView]);

  return (
    <div
      className="basis-1/2 grow-0 shrink-0 h-full overflow-y-auto"
      ref={editorRef}
    />
  );
};
