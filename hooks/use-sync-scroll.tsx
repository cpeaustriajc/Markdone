import { useEffect } from 'react'

function useSyncScroll(ref1: React.RefObject<HTMLDivElement>, ref2: React.RefObject<HTMLDivElement>) {
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

export { useSyncScroll }
