import { Tables } from '@/lib/common.types'
// import { Skeleton } from '@/components/ui/skeleton'

type Props = {
	drafts: React.ReactNode
	empty: React.ReactNode
}

export default async function Layout({ drafts, empty }: Props) {
	const res = await fetch("/api/drafts/all", { next: { tags: ['drafts'] } })
	const initialDrafts = await res.json() as Tables<'drafts'>[]

	const isEmpty = initialDrafts?.length === 0
	return <>{isEmpty ? empty : drafts}</>
}
