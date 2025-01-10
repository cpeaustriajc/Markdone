import { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  {
    title: "Home",
  },
];

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  );
}
