import { getDrafts } from '@/app/loaders'
// import { Skeleton } from '@/components/ui/skeleton'

type Props = {
	drafts: React.ReactNode
	empty: React.ReactNode
}

export default async function Layout({ drafts, empty }: Props) {
	const initialDrafts = await getDrafts()
	const isEmpty = initialDrafts?.length === 0
	return <>{isEmpty ? empty : drafts}</>
}
