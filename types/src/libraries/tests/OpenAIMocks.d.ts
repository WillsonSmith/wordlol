export declare const MOCK_CHAT_OK_RESPONSE: {
    choices: {
        message: string;
    }[];
};
export declare const JSON_OK_HEADERS: {
    status: number;
    headers: {
        'Content-Type': string;
    };
};
import type { ChatCompletionRequestBody } from '../OpenAI';
export declare const MOCK_CHAT_COMPLETE_OPTIONS: ChatCompletionRequestBody;
export declare const MOCK_CHAT_API_KEY_ERROR_RESPONSE: {
    results: never[];
    error: {
        message: string;
        type: string;
        param: null;
        code: null;
    };
};
export declare const JSON_401_HEADERS: {
    status: number;
    headers: {
        'Content-Type': string;
    };
};
export declare const CHAT_COMPLETIONS_ENDPOINT = "https://api.openai.com/v1/chat/completions";
export declare const MOCK_CALLED_WITH_OPTIONS: (API_KEY: string) => {
    method: string;
    headers: {
        'Content-Type': string;
        Authorization: string;
    };
    body: string;
};
