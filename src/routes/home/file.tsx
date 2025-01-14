import { Editor } from "#/components/Editor";
import { JSX, useRef, useState, useEffect, useSyncExternalStore } from "react";
import { Route } from "./+types";
import { editorStore } from "#/stores/editor";
import { useSelector } from "@xstate/store/react";

export const meta: Route.MetaFunction = () => [
  {
    title: "Home",
  },
  {
    name: "color-scheme",
    content: "dark light",
  },
];

export async function clientLoader({ params }: Route.LoaderArgs) {
  return {
    params,
  };
}

export interface CommonProps<TData, TReturn> {
  data: TData;
  onSave: (data: TData) => Promise<TReturn> | TReturn | void;
  interval?: number;
  saveOnUnmount?: boolean;
}

export interface AutosaveProps<TData, TReturn>
  extends CommonProps<TData, TReturn> {
  element?: JSX.Element | null;
}

export function useDebounce<TData>(data: TData, interval: number) {
  const [liveData, setLiveData] = useState<TData>(data);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = window.setTimeout(() => {
        setLiveData(data);
      }, interval);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [data, interval]);

  return liveData;
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

export default function Home({ params }: Route.ComponentProps) {
  const content = useSelector(editorStore, (state) =>
    state.context.files.find((file) => file.id === params.id),
  );

  if (!content) {
    throw new Error("File not found");
  }

  useSyncExternalStore(
    () => {
      document.title = content.title;

      return () => {
        document.title = "Markdone";
      };
    },
    () => document.title,
  );

  return <Editor />;
}
