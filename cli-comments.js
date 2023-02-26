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
    
    const output = await getGPTOutput(input);
    
    fs.writeFile('./comments.txt', output, err => {
        if (err) {
            console.error(err);
        }
    })
}

run();


