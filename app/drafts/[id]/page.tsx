'use client'

import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'
import { useMediaquery } from '@/hooks/use-media-query'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { getDrafts } from '@/lib/supabase'
import { useRef } from 'react'

export async function generateStaticParams() {
	const drafts = await getDrafts()
	return drafts?.data!.map(data => ({
		id: data.id,
	}))
}

export default function Page({ params }: { params: { id: string } }) {
	const editorRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const isDesktop = useMediaquery('(min-width: 768px)')

	useSyncScroll(editorRef, previewRef)
	return (
		<main className="flex h-[calc(100%-4rem)] flex-col md:flex-row">
			<Editor editorRef={editorRef} id={params.id} />
			<Separator orientation={isDesktop ? 'vertical' : 'horizontal'} />
			<Preview previewRef={previewRef} id={params.id} />
		</main>
	)
}
