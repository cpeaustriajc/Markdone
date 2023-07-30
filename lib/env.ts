import { object, string, Output, safeParse } from 'valibot'

const environmentVariables = object({
	OPENAI_API_KEY: string(),
	NEXT_PUBLIC_SUPABASE_URL: string(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: string(),
})

safeParse(environmentVariables, process.env)

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Output<typeof environmentVariables> {}
	}
}
