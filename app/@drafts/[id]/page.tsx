import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'
import { useMediaquery } from '@/hooks/use-media-query'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { useRef } from 'react'

export default function Page() {
	const editorRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const isDesktop = useMediaquery('(min-width: 768px)')

	useSyncScroll(editorRef, previewRef)
	return (
		<main className="flex h-[calc(100%-4rem)] flex-col md:flex-row">
			<Editor editorRef={editorRef} />
			<Separator orientation={isDesktop ? 'vertical' : 'horizontal'} />
			<Preview previewRef={previewRef} />
		</main>
	)
}
