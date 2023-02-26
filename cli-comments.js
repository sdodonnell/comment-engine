import yargs from 'yargs';
import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import { setTimeout } from "timers/promises";

const API_KEY = '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';

const getGPTOutput = async data => {
    // call OpenAI API
    await setTimeout(1000);

    // return output from API
    return JSON.stringify(data);
}

const run = async () => {
    const input = {
        someKey: 'someValue'
    }

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'input',
                message: 'Type something and test the output!'
            },
            {
                type: 'list',
                name: 'list',
                message: 'Choose one of the following options and test the output!',
                choices: [
                    'A',
                    'B',
                    'C'
                ]
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Choose yes or no?'
            }
        ])
        .then((answers) => {
            return getGPTOutput(answers);
        })
        .then((output) => {
            fs.writeFile('./comments.txt', output, err => {
                if (err) {
                    console.error(err);
                }
            })
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log('Something went wrong: TTY Error');
            } else {
                console.error('Something went wrong: ', err);
            }
        });

}

run();


