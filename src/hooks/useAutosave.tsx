import { useEffect, useRef } from "react";
import { useDebounce } from "./useDebounce";

export interface CommonProps<TData, TReturn> {
  data: TData;
  onSave: (data: TData) => TReturn;
  interval?: number;
  saveOnUnmount?: boolean;
}

export interface AutosaveProps<TData, TReturn>
  extends CommonProps<TData, TReturn> {
  element: React.ReactNode;
}

export function useAutosave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  saveOnUnmount = true,
}: CommonProps<TData, TReturn>) {
  const valueOnCleanup = useRef(data);
  const initialRender = useRef(true);
  const handleSave = useRef(onSave);

  const debouncedValueToSave = useDebounce(data, interval);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      handleSave.current(debouncedValueToSave);
    }
  }, [debouncedValueToSave]);

  useEffect(() => {
    handleSave.current = onSave;
  }, [onSave]);

  useEffect(
    () => () => {
      if (saveOnUnmount) {
        handleSave.current(valueOnCleanup.current);
      }
    },
    [saveOnUnmount],
  );
}
