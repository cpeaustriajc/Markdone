'use client'

import { Editor } from '@/components/editor/legacy/editor'
import { Preview } from '@/components/editor/legacy/preview'
import { Separator } from '@/components/ui/separator'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { ElementRef, useRef } from 'react'

export function LegacyEditor({ params }: { params: { id: string } }) {
	const editorRef = useRef<ElementRef<'div'>>(null)
	const previewRef = useRef<ElementRef<'div'>>(null)
	useSyncScroll(editorRef, previewRef)

	return (
		<>
			<Editor editorRef={editorRef} id={params.id} />
			<Separator orientation="vertical" className="hidden md:block" />
			<Separator orientation="horizontal" className="block md:hidden" />
			<Preview previewRef={previewRef} />
		</>
	)
}
