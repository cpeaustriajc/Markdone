'use client'

import { Editor } from '@/components/legacy-editor/editor'
import { Preview } from '@/components/legacy-editor/preview'
import { Separator } from '@/components/ui/separator'
import { useGetDraftByIdQuery } from '@/hooks/use-get-draft-by-id-query'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { ElementRef, useRef, useState } from 'react'
import { LoadingSkeleton } from '@/components/loading-skeleton'
import { useEditor } from '@/lib/providers/editor'

export default function LegacyEditor({ id }: { id: string }) {
	const { isLoading } = useGetDraftByIdQuery(id)
	const editorRef = useRef<ElementRef<'div'>>(null)
	const previewRef = useRef<ElementRef<'div'>>(null)
	const { drafts } = useEditor()

	if (!drafts) throw Error('Drafts not found')

	const draft = drafts.find((draft) => draft.id === id)

	if (draft === undefined)
		throw new Error('Draft not found')

	const content = draft.content

	useSyncScroll(editorRef, previewRef)
	if (isLoading) {
		return (
			<>
				<LoadingSkeleton />
				<Separator orientation="vertical" />
				<LoadingSkeleton />
			</>
		)
	}

	return (
		<>
			<Editor editorRef={editorRef} content={content} />
			<Separator orientation="vertical" />
			<Preview previewRef={previewRef} content={content} />
		</>
	)
}
