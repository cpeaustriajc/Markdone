import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
	return (
		<form>
			<Label htmlFor="email">Email</Label>
			<Input type="text" placeholder="Email" id="email" name="email" />
			<Button type="submit">Login</Button>
		</form>
	)
}
