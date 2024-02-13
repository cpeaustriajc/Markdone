"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	HamburgerMenuIcon,
	FilePlusIcon,
	FileIcon,
	TrashIcon,
	DownloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SidebarLoadingSkeleton } from "./sidebar-loading-skeleton";
import { useDrafts } from "@/lib/providers/drafts";
import dynamic from "next/dynamic";
import { inter } from "@/lib/fonts";

const DialogTrigger = dynamic(
	() => import("../components/ui/dialog").then((mod) => mod.DialogTrigger),
	{ ssr: false },
);
const SheetTrigger = dynamic(
	() => import("../components/ui/sheet").then((mod) => mod.SheetTrigger),
	{ ssr: false },
);

export function Sidebar() {
	const { drafts, dispatch } = useDrafts();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="icon">
					<span className="sr-only">Open Preferences</span>
					<HamburgerMenuIcon className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent className={inter.className} side="left">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<div className="grid w-full gap-1.5">
					<Button
						className="justify-start text-left"
						onClick={() => {
							const newDraft = {
								id: self.crypto.randomUUID(),
								content: "",
								filename: "Untitled",
							};
							dispatch({
								type: "CREATE_DRAFT",
								payload: newDraft,
							});
							sessionStorage.setItem(
								"markdone:drafts",
								JSON.stringify([...drafts, newDraft]),
							);
						}}
					>
						<FilePlusIcon className="mr-2 h-4 w-4" /> Create New Draft
					</Button>
					<h2 className="text-lg font-semibold text-foreground">Drafts</h2>
					{!drafts ? (
						<SidebarLoadingSkeleton />
					) : (
						drafts.map((draft) => (
							<div className="flex w-full flex-row" key={draft.id}>
								<Button
									className="grow justify-start text-left"
									variant="secondary"
									asChild
								>
									<Link
										href={`/editor/${draft.id}/`}
										className="rounded-br-none rounded-tr-none align-middle"
									>
										<span className="inline-flex">
											<FileIcon className="mr-2 inline h-4 w-4" />{" "}
											{draft.filename}
										</span>
									</Link>
								</Button>
								<Button
									variant="secondary"
									className="rounded-none px-2"
									onClick={() => {
										const a = document.createElement("a");
										const blob = new Blob([draft.content], {
											type: "text/plain",
										});
										const url = URL.createObjectURL(blob);
										a.href = url;
										a.download = `${draft.filename}.md`;
										a.click();
										URL.revokeObjectURL(url);
										a.remove();
									}}
								>
									<DownloadIcon className="h-4 w-4" />
									<span className="sr-only">Download Draft</span>
								</Button>
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant="destructive"
											className="rounded-bl-none rounded-tl-none  px-2"
										>
											<TrashIcon className="h-4 w-4" />
											<span className="sr-only">Delete Draft</span>
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											Are you sure you want to delete the file?
										</DialogHeader>
										<DialogDescription>
											You will not be able to recover it.
										</DialogDescription>
										<div>
											<Button
												variant={"destructive"}
												className={inter.className}
												onClick={() => {
													dispatch({ type: "DELETE_DRAFT", payload: draft.id });
													sessionStorage.setItem(
														"markdone:drafts",
														JSON.stringify(
															drafts.filter((d) => d.id !== draft.id),
														),
													);
												}}
											>
												Yes, I am Sure
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						))
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
