const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPENAI_API = `${ORIGIN}/${API_VERSION}`;

export type OpenAIChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatCompletionArguments = {
  messages: OpenAIChatMessage[];
};

export type APIResponse = {
  first: { content: string };
  error?: { first: { content: string }; error: Error };
};

export class OpenAI {
  apiKey?: string;
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async chatCompletion({ messages }: ChatCompletionArguments): Promise<{
    first: { content: string };
    error?: { first: { content: string }; error: Error };
  }> {
    let response;
    try {
      response = await fetch(`${OPENAI_API}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
        }),
      });

      const data = await response.json();
      return {
        first: data?.choices[0].message,
      };
    } catch (error: any) {
      return {
        first: { content: 'Error' },
        error,
      };
    }
  }

  updateKey(key: string) {
    this.apiKey = key;
  }
}
