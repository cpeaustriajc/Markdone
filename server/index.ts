import { publicProcedure, router } from '@/server/trpc'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { currentUser } from '@clerk/nextjs'
import { TRPCError } from '@trpc/server'

export const draftRouter = router({
	list: publicProcedure.query(async () => {
		return await prisma.drafts.findMany()
	}),
	create: publicProcedure.mutation(async () => {
		const user = await currentUser()
		if (!user || !user.primaryEmailAddressId) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'You must be logged in to create a draft with cloud storage.',
			})
		}

		return await prisma.drafts.create({
			data: {
				email: user.primaryEmailAddressId,
			},
		})
	}),
	delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
		const id = input.id

		const user = await currentUser()

		if (!user || !user.primaryEmailAddressId) {
			throw new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'You must be logged in to delete a draft with cloud storage.',
			})
		}

		return await prisma.drafts.delete({ where: { id, email: user.primaryEmailAddressId } })
	}),
	byId: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
		const id = input.id
		return await prisma.drafts.findUnique({ where: { id } })
	}),
	updateFilename: publicProcedure
		.input(z.object({ id: z.string(), filename: z.string() }))
		.mutation(async ({ input }) => {
			const { id, filename } = input
			const user = await currentUser()

			if (!user || !user.primaryEmailAddressId) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to delete a draft with cloud storage.',
				})
			}

			return await prisma.drafts.update({ where: { id, email: user.primaryEmailAddressId }, data: { filename } })
		}),
	updateContent: publicProcedure
		.input(z.object({ id: z.string(), content: z.string() }))
		.mutation(async ({ input }) => {
			const { id, content } = input
			const user = await currentUser()

			if (!user || !user.primaryEmailAddressId) {
				throw new TRPCError({
					code: 'UNAUTHORIZED',
					message: 'You must be logged in to delete a draft with cloud storage.',
				})
			}

			return await prisma.drafts.update({ where: { id }, data: { content, email: user.primaryEmailAddressId } })
		}),
})

export const appRouter = router({
	draft: draftRouter,
})

export type AppRouter = typeof appRouter
