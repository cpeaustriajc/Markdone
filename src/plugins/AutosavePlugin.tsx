import { AutosaveProps, useAutosave } from "#/hooks/useAutosave";

export function AutosavePlugin<TData, TReturn>({
  element = null,
  ...props
}: AutosaveProps<TData, TReturn>) {
  useAutosave(props);
  return element;
}
