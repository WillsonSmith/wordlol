const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPENAI_API = `${ORIGIN}/${API_VERSION}`;

type OpenAIChatCompleteResponse = {
  choices: OpenAIChatMessage[];
  error?: OpenAIError;
};

type OpenAIError = {
  message: string;
  type?: string;
  param?: string | null;
  code?: string | null;
};

export type OpenAIChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatCompletionArguments = {
  messages: OpenAIChatMessage[];
};

export type APIResponse = {
  results: { message: OpenAIChatMessage }[];
  error?: OpenAIError;
};

export class OpenAI {
  apiKey?: string;
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async completeChat({
    messages,
  }: ChatCompletionArguments): Promise<APIResponse> {
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

      const data: OpenAIChatCompleteResponse = await response.json();

      if (data?.error) return handleErrrorResponse(data.error);
      return {
        results: data?.choices.map((choice: any) => ({
          message: choice.message,
        })),
      };
    } catch (error: any) {
      console.error(error);
      return {
        results: [],
        error: {
          message: 'There was an error fetching the response.',
        },
      };
    }
  }

  updateKey(key: string) {
    this.apiKey = key;
  }
}

function handleErrrorResponse(error: OpenAIError) {
  return {
    results: [],
    error,
  };
}
