"use client";

import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype/lib";
import rehypeReact from "rehype-react/lib";

type Props = {
  doc: string;
};
export const Preview = (props: Props) => {
  const { doc } = props;

  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeReact, {
      createElement,
      Fragment,
    })
    .processSync(doc).result;

  return (
    <div className="h-full basis-1/2 grow-0 shrink-0 overflow-x-hidden overflow-y-auto pl-3 border-l border-gray-400 prose max-w-full dark:prose-invert">
      {md}
    </div>
  );
};

export default Preview;
