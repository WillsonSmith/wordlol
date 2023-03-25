import { OpenAI } from '../src/libraries/OpenAI';
import { Handler } from '@netlify/functions';
export const handler: Handler = async (event, context) => {
  try {
    const word = event.queryStringParameters?.term;
    if (!word) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing search query' }),
      };
    }

    const openAI = new OpenAI(process.env.OPENAI_API_KEY);
    const response = await openAI.chatCompletion({
      messages: [
        {
          role: 'user',
          content: `Invent a new definition for "${word}" in the style of Urban Dictionary.`,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
