import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "Markdone" }],
  }),
});

function Home() {
  return (
    <div>
      <h1>Markdone</h1>
      <p>Write markdown and see it rendered in real-time.</p>
    </div>
  );
}
