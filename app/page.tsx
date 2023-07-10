'use client'
import { useEffect, useRef, useState } from 'react'

import { Editor } from '@/components/editor'
import { Header } from '@/components/header'
import { Preview } from '@/components/preview'
import { Separator } from '@/components/ui/separator'

function useSyncScroll(
	ref1: React.RefObject<HTMLDivElement>,
	ref2: React.RefObject<HTMLDivElement>,
) {
	useEffect(() => {
		const firstRef = ref1.current
		const secondRef = ref2.current
		const handleScroll = (e: Event) => {
			const { scrollTop } = e.target as HTMLElement
			if (ref1.current) {
				ref1.current.scrollTop = scrollTop
			}

			if (ref2.current) {
				ref2.current.scrollTop = scrollTop
			}
		}

		ref1.current?.addEventListener('scroll', handleScroll)
		ref2.current?.addEventListener('scroll', handleScroll)
		return () => {
			firstRef?.removeEventListener('scroll', handleScroll)
			secondRef?.removeEventListener('scroll', handleScroll)
		}
	}, [ref1, ref2])
}

function useMediaquery(query: string) {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const media = window.matchMedia(query)

		if (media.matches !== matches) {
			setMatches(media.matches)
		}

		const listener = () => setMatches(media.matches)
		window.addEventListener('resize', listener)

		return () => window.removeEventListener('resize', listener)
	}, [matches, query])

	return matches
}

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
				<Separator
					orientation={isDesktop ? 'vertical' : 'horizontal'}
				/>
				<Preview previewRef={previewRef} />
			</main>
		</>
	)
}
