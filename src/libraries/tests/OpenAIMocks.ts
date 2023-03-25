export const MOCK_CHAT_OK_RESPONSE = {
  choices: [
    {
      message: 'Hello world',
    },
  ],
};

export const JSON_OK_HEADERS = {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
  },
};

import type { ChatCompletionArguments } from '../OpenAI';
export const MOCK_CHAT_COMPLETE_OPTIONS: ChatCompletionArguments = {
  messages: [
    {
      role: 'user',
      content: 'Hello world',
    },
  ],
};

export const MOCK_CHAT_API_KEY_ERROR_RESPONSE = {
  results: [],
  error: {
    message:
      "You didn't provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you're accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://platform.openai.com/account/api-keys.",
    type: 'invalid_request_error',
    param: null,
    code: null,
  },
};

export const JSON_401_HEADERS = {
  status: 401,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const CHAT_COMPLETIONS_ENDPOINT =
  'https://api.openai.com/v1/chat/completions';

export const MOCK_CALLED_WITH_OPTIONS = (API_KEY: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: MOCK_CHAT_COMPLETE_OPTIONS.messages,
  }),
});
