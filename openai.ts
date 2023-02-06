import { Configuration, OpenAIApi } from 'openai';

export class MyOpenAI {
  client: OpenAIApi;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    const configuration = new Configuration({
      apiKey
    });

    this.client = new OpenAIApi(configuration);
  }

  public async writeCode(text: string): Promise<string> {
    const response = await this.client.createCompletion({
      model: 'code-davinci-002',
      prompt: text,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      max_tokens: 300
    });

    return response.data.choices[0].text as string;
  }

  public async explainCode(code: string): Promise<string> {
    code += `\n"""\n Here's what the above code is doing:\n1. `
    const response = await this.client.createCompletion({
      model: 'code-davinci-002',
      prompt: code,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      max_tokens: 300,
      stop: [`"""`]
    });

    return response.data.choices[0].text as string;
  }

  public async tldr(text: string): Promise<string> {
    text += "\nTl;dr\n";

    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.7,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 1.0,
      max_tokens: 200,
    });

    return response.data.choices[0].text as string;
  }

  public async brainstorm(text: string): Promise<string> {
    text += "\nLet's think step by step."

    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.69,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.2,
      presence_penalty: 0.57,
      stop: ["###"],
    });

    return response.data.choices[0].text as string;
  }

  public async askRandom(text: string): Promise<string> {
    const response = await this.client.createCompletion({
      model: 'text-davinci-003',
      prompt: text,
      temperature: 0.7,
      max_tokens: 250,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5
    });

    return response.data.choices[0].text as string || `I don't know the answer`;
  }
}