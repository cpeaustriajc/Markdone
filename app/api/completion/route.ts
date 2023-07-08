import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const config = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export async function POST(req: Request) {
	const { prompt } = await req.json()

	const response = await openai.createCompletion({
		model: 'gpt-3.5-turbo',
		stream: true,
		prompt,
	})

	const stream = OpenAIStream(response)

	return new StreamingTextResponse(stream)
}
