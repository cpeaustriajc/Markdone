import { CommonProps, useAutosave } from "#/hooks/useAutosave";

export interface AutosaveProps<TData, TReturn>
  extends CommonProps<TData, TReturn> {
  element: React.ReactNode;
}

export function AutosavePlugin<TData, TReturn>({
  element = null,
  ...props
}: AutosaveProps<TData, TReturn>) {
  useAutosave(props);
  return element;
}
