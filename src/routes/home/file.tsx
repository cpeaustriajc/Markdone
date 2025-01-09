import { Editor } from "#/components/Editor";
import { Route } from "./+types";

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

export default function Home({ params }: Route.ComponentProps) {
  console.log(JSON.stringify(params));
  return <Editor />;
}
