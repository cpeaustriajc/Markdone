import { Link }from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

export function NavigationHome() {
	return (
		<div>
			<Button asChild variant="ghost">
				<Link to="/">
					<span className="sr-only">Home</span>
					<Pencil2Icon className="h-6 w-6" />
				</Link>
			</Button>
		</div>
	)
}
