import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex h-full flex-col items-center justify-center bg-background text-foreground">
			<div>
				<h1>Draft not Found</h1>
				<Button asChild>
					<Link href="/">Go back home</Link>
				</Button>
			</div>
		</main>
	);
}
