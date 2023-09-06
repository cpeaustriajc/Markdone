import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export const revalidate = 60 * 60 * 24 * 7 // 1 week

export const getDrafts = unstable_cache(async () => {
	return await prisma.drafts.findMany()
})

export const getDraftById = unstable_cache(async ({ id }: { id: string }) => {
	return await prisma.drafts.findUnique({ where: { id } })
})
