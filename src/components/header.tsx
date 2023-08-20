'use client'

import { NavigationSocials } from '@/components/navigation-socials'
import { Sidebar } from '@/components/sidebar'
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { useDrafts } from '@/lib/providers/drafts'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { CheckCircledIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Input } from './ui/input'
import { inter } from '@/lib/fonts'
import { Button } from './ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from './ui/dialog'
import { useEditor } from './editor/legacy'

const ModeToggle = dynamic(() => import('./mode-toggle').then(mod => mod.ModeToggle), { ssr: false })

export function Header() {
	const { drafts, dispatch } = useDrafts()
	const { content } = useEditor()
	const router = useRouter()
	const currentDraft = drafts?.find(draft => draft.id === router.query.id)

	return (
		<header className="container flex h-16 items-center justify-between gap-1.5 bg-background text-foreground">
			<div className="flex flex-row items-center gap-2">
				<Sidebar />
				<div className="flex gap-2">
					<div className="min-w-[128px]">
						<h1 className={`text-2xl font-bold ${inter.className}`}>
							{currentDraft ? currentDraft.filename : 'Empty'}
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
								<h2 className={`text-lg font-semibold text-foreground ${inter.className}`}>
									Edit Filename
								</h2>
							</DialogHeader>
							<div className={`flex flex-col gap-2 ${inter.className}`}>
								<Input
									type="text"
									className="rounded-md border border-foreground bg-background p-2"
									value={currentDraft && currentDraft.filename}
									onChange={e => {
										if (e.currentTarget.value !== currentDraft?.filename) {
											dispatch({
												type: 'CHANGE_FILENAME',
												payload: {
													id: currentDraft?.id ?? '',
													filename: e.currentTarget.value,
												},
											})
										}
									}}
								/>
							</div>
						</DialogContent>
					</Dialog>
					<Button
						size="icon"
						variant="ghost"
						title="Save Draft"
						onClick={() => {
							dispatch({
								type: 'CHANGE_CONTENT',
								payload: {
									id: currentDraft?.id ?? '',
									content: content,
								},
							})
						}}>
						<CheckCircledIcon className="h-5 w-5" />
						<span className="sr-only">Save</span>
					</Button>
				</div>
			</div>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationSocials />
					<NavigationMenuItem>
						<ModeToggle />
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	)
}
