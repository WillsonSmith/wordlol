import { OpenAI } from '../OpenAI';
import { expect } from '@open-wc/testing';
import { stub, SinonStub } from 'sinon';

import {
  MOCK_CHAT_OK_RESPONSE,
  MOCK_CALLED_WITH_OPTIONS,
  MOCK_CHAT_COMPLETE_OPTIONS,
  MOCK_CHAT_API_KEY_ERROR_RESPONSE,
  CHAT_COMPLETIONS_ENDPOINT,
  JSON_401_HEADERS,
  JSON_OK_HEADERS,
} from './OpenAIMocks.js';

describe('OpenAI', () => {
  it('Sets the API key', () => {
    const openAI = new OpenAI('API_KEY');
    expect(openAI.apiKey).to.equal('API_KEY');
  });

  describe('chatComplete', () => {
    let stubbedFetch: SinonStub;
    beforeEach(() => {
      stubbedFetch = stub(window, 'fetch');
    });
    afterEach(() => {
      stubbedFetch.restore();
    });

    it('Returns messages when response is a success', async () => {
      const API_KEY = 'API_KEY';
      stubbedFetch.resolves(
        new Response(JSON.stringify(MOCK_CHAT_OK_RESPONSE), JSON_OK_HEADERS)
      );

      const openAI = new OpenAI(API_KEY);
      const result = await openAI.completeChat(MOCK_CHAT_COMPLETE_OPTIONS);

      expect(result).to.deep.equal({
        results: MOCK_CHAT_OK_RESPONSE.choices,
      });

      expect(stubbedFetch).to.have.been.calledWith(
        CHAT_COMPLETIONS_ENDPOINT,
        MOCK_CALLED_WITH_OPTIONS(API_KEY)
      );
    });

    it('Returns an error object when the API returns an error', async () => {
      stubbedFetch.resolves(
        new Response(
          JSON.stringify(MOCK_CHAT_API_KEY_ERROR_RESPONSE),
          JSON_401_HEADERS
        )
      );

      const openAI = new OpenAI('API_KEY');
      const result = await openAI.completeChat(MOCK_CHAT_COMPLETE_OPTIONS);

      expect(result).to.deep.equal(MOCK_CHAT_API_KEY_ERROR_RESPONSE);
    });

    it('Returns an error when there is a fetch error', async () => {
      stubbedFetch.rejects('Error');

      const openAI = new OpenAI('API_KEY');
      const result = await openAI.completeChat(MOCK_CHAT_COMPLETE_OPTIONS);

      expect(result).to.deep.equal({
        results: [],
        error: {
          message: 'There was an error fetching the response.',
        },
      });
    });
  });
});
