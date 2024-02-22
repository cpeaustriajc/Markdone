"use client";

import { Sidebar } from "./sidebar";
import {
	NavigationMenuList,
} from "./ui/navigation-menu";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { CheckCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
} from "./ui/dialog";


export function Header() {

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Sidebar />
				<div className="flex gap-2">
					<div className="min-w-[128px]">
						<h1 className={`text-2xl font-bold`}>
							Demo
						</h1>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button size="icon" variant="ghost" title="Edit Filename">
								<span className="sr-only">Edit Filename</span>
								<Pencil1Icon className="h-5 w-5" />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<h2
									className={`text-lg font-semibold text-foreground`}
								>
									Edit Filename
								</h2>
							</DialogHeader>
							<div className={`flex flex-col gap-2`}>
								<Input
									type="text"
									className="rounded-md border border-foreground bg-background p-2"
								/>
							</div>
						</DialogContent>
					</Dialog>
					<Button
						size="icon"
						variant="ghost"
						title="Save Draft"
					>
						<CheckCircledIcon className="h-5 w-5" />
						<span className="sr-only">Save</span>
					</Button>
				</div>
			</div>
			<NavigationMenu>
				<NavigationMenuList>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
