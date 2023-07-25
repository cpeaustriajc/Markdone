'use client'

import { Editor } from '@/components/editor'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'
import { useMediaquery } from '@/hooks/use-media-query'
import { useSyncScroll } from '@/hooks/use-sync-scroll'
import { getDrafts } from '@/lib/supabase'
import { useRef, useState } from 'react'

export async function generateStaticParams() {
	const { data } = await getDrafts()

	if (!data) {
		throw new Error('No drafts found')
	}

	return data.map(data => ({
		id: data.id,
	}))
}

export default function Page() {
	const editorRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const [content, setContent] = useState<string>('')
	const isDesktop = useMediaquery('(min-width: 768px)')

	useSyncScroll(editorRef, previewRef)
	return (
		<main className="container flex h-[calc(100%-4rem)] flex-col md:flex-row xl:border-x">
			<Editor editorRef={editorRef} content={content} setContent={setContent} />
			<Separator orientation={isDesktop ? 'vertical' : 'horizontal'} />
			<Preview previewRef={previewRef} content={content} />
		</main>
	)
}
