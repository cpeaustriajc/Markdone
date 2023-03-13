import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype/lib";
import rehypeReact from "rehype-react/lib";

export const Preview = ({ doc }: { doc: string }) => {
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
    <div className="h-full basis-1/2 overflow-x-hidden overflow-y-auto grow-0 shrink-0 pl-3 border-l border-gray-400 prose dark:prose-invert">
      {md}
    </div>
  );
};

export default Preview;
