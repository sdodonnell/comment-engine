import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import { Configuration, OpenAIApi } from 'openai';

const API_KEY = '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';
const PROMPT = `Write summary of feedback for a high school history student named [name] in at least 5 sentences. Point out [pronoun] strengths, which include [strength1] and [strength2], and [pronoun] areas of improvement, which include [improvement1] and [improvement2]. Also point out the fact that [fact1].`

const getGPTOutput = async data => {
    const configuration = new Configuration({
        apiKey: API_KEY,
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

        console.log(prompt);

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

const run = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Student\'s first name:'
            },
            {
                type: 'list',
                name: 'pronoun',
                message: 'Student\'s pronouns:',
                choices: [
                    { value: 'his', name: 'he/him' },
                    { value: 'her', name: 'she/her' },
                    { value: 'their', name: 'they/them' }
                ]
            },
            {
                type: 'input',
                name: 'strength1',
                message: 'What is one of the student\'s strengths?'
            },
            {
                type: 'input',
                name: 'strength2',
                message: 'What is another of the student\'s strengths?'
            },
            {
                type: 'input',
                name: 'improvement1',
                message: 'What is one of the student\'s areas of improvement?'
            },
            {
                type: 'input',
                name: 'improvement2',
                message: 'What is another of the student\'s areas of improvement?'
            },
            {
                type: 'input',
                name: 'fact1',
                message: 'What is a fact you want to highlight about the student?'
            }
        ])
        .then(async (answers) => {
            const { data: { choices, usage }} = await getGPTOutput(answers);
            console.log(choices, usage);

            const textOutput = choices.map(el => el.text).join(' ');

            fs.writeFile('./comments.txt', textOutput, err => {
                if (err) {
                    console.error(err);
                }
            })
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log('Something went wrong: TTY Error');
            } else {
                console.error('Something went wrong: ', error);
            }
        });

}

run();


