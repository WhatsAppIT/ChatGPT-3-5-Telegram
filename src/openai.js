import OpenAI from "openai";
import config from 'config';
import { createReadStream } from 'fs';


class OpenAIApi {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
    }

    constructor(apiKey) {
        const openai = new OpenAI({
            apiKey,
        });
        //this.openai = new OpenAIApi(configuration)
    }

    async chat(messages) {
        try{
            const response = await openai.chat.completions.create({
                messages,
                model: "gpt-3.5-turbo",
            });

            return response.data.choices[0].message
        } catch(err) {
            console.log('Ошибка при создании чата')
        }

    }

    async transcription(filepath) {
        try{
            await this.openai.createTranscription()
        } catch(err) {
            console.log('Ошибка при переводе', err.message)
        }
    }
}

export const openai = new OpenAIApi(config.get('OPENAI_KEY'));