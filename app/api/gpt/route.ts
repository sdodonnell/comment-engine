import { Configuration, OpenAIApi } from 'openai';

type GPTData = {
    name: string
    pronoun: string
    strength1: string
    strength2: string
    improvement1: string
    improvement2: string
    fact1: string
}

type GPTResponse = {
    data: {
        choices: [],
        usage: object
    },
}

export async function POST(request: Request) {
    console.log(request.body);
    
    const PROMPT = `Write summary of feedback for a high school history student named [name] in at least 8 sentences. Point out [pronoun] strengths, which include [strength1] and [strength2], and [pronoun] areas of improvement, which include [improvement1] and [improvement2]. Also point out the fact that [fact1].`

    const getGPTOutput = async (data: GPTData): Promise<GPTResponse | undefined> => {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        try {
            const openai = new OpenAIApi(configuration);

            const {
                name,
                pronoun,
                strength1,
                strength2,
                improvement1,
                improvement2,
                fact1
            } = data;

            const prompt = PROMPT
                .replace('[name]', name)
                .replace(/\[pronoun\]/g, pronoun)
                .replace('[strength1]', strength1)
                .replace('[strength2]', strength2)
                .replace('[improvement1]', improvement1)
                .replace('[improvement2]', improvement2)
                .replace('[fact1]', fact1)

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt,
                temperature: 0.5,
                max_tokens: 2000,
                n: 2
            })

            return response;
        } catch (err) {
            console.error(err);
        }
    }

    const { data: { choices, usage }} = await getGPTOutput(answers);
    console.log(choices, usage);

    const textOutput = choices.map(el => el.text).join(' ');

    return new Response(textOutput);
}
