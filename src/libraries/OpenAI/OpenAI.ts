const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPENAI_API = `${ORIGIN}/${API_VERSION}`;

type ChatCompletionResponse = {
  choices: { message: ChatMessage }[];
  error?: ChatCompletionError;
};

type ChatCompletionError = {
  message: string;
  type?: string;
  param?: string | null;
  code?: string | null;
};

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatCompletionRequestBody = {
  messages: ChatMessage[];
};

export type ChatCompletionApiResponse = {
  results: { message: ChatMessage }[];
  error?: ChatCompletionError;
};

export class OpenAI {
  apiKey?: string;
  constructor(apiKey?: string) {
    this.apiKey = apiKey;
  }

  async completeChat({ messages }: ChatCompletionRequestBody): Promise<ChatCompletionApiResponse> {
    try {
      const chatCompletionResponse = await this._requestChatCompletion(messages);

      if (chatCompletionResponse.error) {
        return handleErrrorResponse(chatCompletionResponse.error);
      }

      return {
        results: this._mapChatCompletionChoicesToResults(chatCompletionResponse.choices),
      };
    } catch (error: unknown) {
      return {
        results: [],
        error: {
          message: 'There was an error fetching the response.',
        },
      };
    }
  }

  private async _requestChatCompletion(messages: ChatMessage[]): Promise<ChatCompletionResponse> {
    const response = await fetch(`${OPENAI_API}/chat/completions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
      }),
    });

    return response.json();
  }
  private _mapChatCompletionChoicesToResults(
    choices: ChatCompletionResponse['choices'],
  ): { message: ChatMessage }[] {
    return choices.map((choice) => ({
      message: choice.message,
    }));
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
  }
}

function handleErrrorResponse(error: ChatCompletionError) {
  return {
    results: [],
    error,
  };
}
