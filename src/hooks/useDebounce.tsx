import { useState, useSyncExternalStore } from "react";

export function useDebounce<TData>(data: TData, interval: number) {
  const [liveData, setLiveData] = useState<TData>(data);

  useSyncExternalStore(
    () => {
      const handler = window.setTimeout(() => {
        setLiveData(data);
      }, interval);

      return () => {
        clearTimeout(handler);
      };
    },
    () => liveData,
  );

  return liveData;
}
