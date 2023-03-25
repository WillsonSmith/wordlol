import fetch from 'node-fetch';
// @ts-ignore
global.fetch = fetch;

export type ServerlessAPIResponse = { results: { content: string }[] };

import {
  ChatCompletionApiResponse,
  OpenAI,
} from '../src/libraries/OpenAI/OpenAI';
import { Handler } from '@netlify/functions';
export const handler: Handler = async (event) => {
  try {
    const word = event.queryStringParameters?.term;
    if (!word) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing search query' }),
      };
    }

    const openAI = new OpenAI(process.env.OPENAI_API_KEY);
    const response = await openAI.completeChat({
      messages: [
        {
          role: 'user',
          content: `Invent a new definition for "${word}" in the style of Urban Dictionary.`,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(transformResponse(response)),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

function transformResponse(response: ChatCompletionApiResponse) {
  return {
    results: response.results.map((result) => ({
      content: result.message.content,
    })),
  };
}
