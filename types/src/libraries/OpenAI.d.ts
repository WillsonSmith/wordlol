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
    results: {
        message: ChatMessage;
    }[];
    error?: ChatCompletionError;
};
export declare class OpenAI {
    apiKey?: string;
    constructor(apiKey?: string);
    completeChat({ messages, }: ChatCompletionRequestBody): Promise<ChatCompletionApiResponse>;
    private _requestChatCompletion;
    private _mapChatCompletionChoicesToResults;
    private get headers();
}
export {};
