import { initTRPC } from '@trpc/server'
import SuperJson from 'superjson'

const t = initTRPC.create({
	transformer: SuperJson,
})

export const router = t.router
export const publicProcedure = t.procedure
