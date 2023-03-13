import { SetStateAction, useCallback, useState } from "react";

import { Editor } from "./components/editor";
import { Header } from "./components/header";
import { Preview } from "./components/preview";

export const App = () => {
  const [doc, setDoc] = useState<string>("# Hello World!\n");

  const handleDocChange = useCallback((newDoc: SetStateAction<string>) => {
    setDoc(newDoc);
  }, []);

  return (
    <>
      <Header />
      <main className="flex h-full">
        <Editor onChange={handleDocChange} initialDoc={doc} />
        <Preview doc={doc} />
      </main>
    </>
  );
};
