import { Editor } from "../components/editor";
import { Preview } from "../components/preview";

async function getDefaultMarkdownFile() {
  const res = await fetch(
    "https://gist.githubusercontent.com/jaycedotbin/c9a7ac32fa5bc58eaeb50e0b8fa65555/raw/b438ba5c6ff0cefcba1030a69ff5e2ce098473ac/markdown-tutorial.md"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch default markdown file");
  }

  return res.text();
}

export default async function HomePage() {
  const data = await getDefaultMarkdownFile();

  return (
    <>
      <main className="flex flex-row h-full">
        <Editor doc={data} />
        <Preview doc={data} />
      </main>
    </>
  );
}
