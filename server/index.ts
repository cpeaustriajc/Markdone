import { publicProcedure, router } from '@/server/trpc'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const appRouter = router({
	getDrafts: publicProcedure.query(async () => {
		return await prisma.drafts.findMany()
	}),
	createDraft: publicProcedure.mutation(async () => {
		return await prisma.drafts.create({ data: {} })
	}),
	deleteDraft: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
		const id = input.id
		return await prisma.drafts.delete({ where: { id } })
	}),
	getDraftById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
		const id = input.id
		return await prisma.drafts.findUnique({ where: { id } })
	}),
	updateDraftFilename: publicProcedure
		.input(z.object({ id: z.string(), filename: z.string() }))
		.mutation(async ({ input }) => {
			const { id, filename } = input
			return await prisma.drafts.update({ where: { id }, data: { filename } })
		}),
	updateDraftContent: publicProcedure
		.input(z.object({ id: z.string(), content: z.string() }))
		.mutation(async ({ input }) => {
			const { id, content } = input
			return await prisma.drafts.update({ where: { id }, data: { content } })
		}),
})

export type AppRouter = typeof appRouter
