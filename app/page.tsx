'use client'
import { Editor } from '@/components/editor'
import { Header } from '@/components/header'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'
import { useMediaquery } from '@/hooks/use-media-query'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { useRef } from 'react'

export default function HomePage() {
	const editorRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const isDesktop = useMediaquery('(min-width: 768px)')

	useSyncScroll(editorRef, previewRef)
	return (
		<>
			<Header />
			<main className="flex h-[calc(100%-4rem)] flex-col md:flex-row">
				<Editor editorRef={editorRef} />
				<Separator orientation={isDesktop ? 'vertical' : 'horizontal'} />
				<Preview previewRef={previewRef} />
			</main>
		</>
	)
}
