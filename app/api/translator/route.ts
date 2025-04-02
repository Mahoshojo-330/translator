
import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

export async function POST(request: Request) {
    try {

        console.log('a')
        const { toBeTranslated } = await request.json();

        console.log('b')

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            //httpAgent: new HttpsProxyAgent("http://127.0.0.1:7890"),
        });

        console.log('c')
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a professional translator." },
                {
                    role: "user",
                    content: `Translate the following text into Chinese: ${toBeTranslated}`,
                },
            ],
        });

        console.log('d')

        return Response.json({ translation: completion.choices[0].message.content })

    } catch (error) {
        console.log('e')
        if (error instanceof Error) {
            console.log(error.message)
        }
        return new Response('Translation failed', {
            status: 500,
        })
    }
}
