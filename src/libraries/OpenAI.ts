const ORIGIN = 'https://api.openai.com';
const API_VERSION = 'v1';
const OPENAI_API = `${ORIGIN}/${API_VERSION}`;

type ChatCompletionResponse = {
  choices: ChatMessage[];
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

  async completeChat({
    messages,
  }: ChatCompletionRequestBody): Promise<ChatCompletionApiResponse> {
    try {
      const chatCompletionResponse = await this._requestChatCompletion(
        messages
      );

      if (chatCompletionResponse.error) {
        return handleErrrorResponse(chatCompletionResponse.error);
      }

      return {
        results: this._mapChatCompletionChoicesToResults(
          chatCompletionResponse.choices
        ),
      };
    } catch (error: any) {
      return {
        results: [],
        error: {
          message: 'There was an error fetching the response.',
        },
      };
    }
  }

  private async _requestChatCompletion(
    messages: ChatMessage[]
  ): Promise<ChatCompletionResponse> {
    const response = await fetch(`${OPENAI_API}/chat/completions`, {
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

    return response.json();
  }
  private _mapChatCompletionChoicesToResults(
    choices: ChatMessage[]
  ): { message: ChatMessage }[] {
    return choices.map((choice: any) => ({
      message: choice.message,
    }));
  }

  updateKey(key: string) {
    this.apiKey = key;
  }
}

function handleErrrorResponse(error: ChatCompletionError) {
  return {
    results: [],
    error,
  };
}
