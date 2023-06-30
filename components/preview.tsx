"use client";

import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

type Props = {
  doc: string;
};
export const Preview = (props: Props) => {
  const { doc } = props;

  return (
    <ReactMarkdown
      children={doc}
      remarkPlugins={[[remarkGfm, { tableCellPadding: true }]]}
      className="h-full basis-1/2 grow-0 shrink-0 overflow-x-hidden overflow-y-auto pl-3 border-l border-gray-400 prose max-w-full dark:prose-invert"
    />
  );
};

export default Preview;
