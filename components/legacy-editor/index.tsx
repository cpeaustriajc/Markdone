'use client'

import { Editor } from '@/components/legacy-editor/editor'
import { Preview } from '@/components/legacy-editor/preview'
import { Separator } from '@/components/ui/separator'
import { useMediaquery } from '@/hooks/use-media-query'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { ElementRef, useRef, useState } from 'react'

export default function LegacyEditor() {
	const editorRef = useRef<ElementRef<'div'>>(null)
	const previewRef = useRef<ElementRef<'div'>>(null)
	const [content, setContent] = useState<string>('')
	const isDesktop = useMediaquery('(min-width: 768px)')

	useSyncScroll(editorRef, previewRef)
	return (
		<>
			<Editor editorRef={editorRef} content={content} setContent={setContent} />
			<Separator orientation={isDesktop ? 'vertical' : 'horizontal'} />
			<Preview previewRef={previewRef} content={content} />
		</>
	)
}
