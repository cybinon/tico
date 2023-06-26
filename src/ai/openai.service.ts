import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

export class OpenAiService {
  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }
  openai: OpenAIApi;

  async createChat(messages: ChatCompletionRequestMessage[]) {
    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.data;
  }
}
