import { z } from 'zod'

const environmentVariables = z.object({
	OPENAI_API_KEY: z.string(),
})

environmentVariables.safeParse(process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof environmentVariables> {}
	}
}
