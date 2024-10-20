import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { z } from "zod";

const bodySchema = z.object({
	fromLocation: z.string(),
	description: z.string(),
	openai: z.string(),
	serp: z.string(),
});

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}

		const body = await request.json();
		const parsedBody = bodySchema.safeParse(body);
		if (!parsedBody.success) {
			return new Response('Invalid body', { status: 400 });
		}
		const { fromLocation, description, openai, serp } = parsedBody.data;

		const model = new OpenAI({ temperature: 0, openAIApiKey: openai });
		const chat = new ChatOpenAI({
			temperature: 0,
			modelName: 'gpt-3.5-turbo-0613',
			openAIApiKey: openai,
		});

		return new Response(JSON.stringify({ parsedBody }));
	},
} satisfies ExportedHandler<Env>;
