export type OpenAIChatMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
};
export type ChatCompletionArguments = {
    messages: OpenAIChatMessage[];
};
export type APIResponse = {
    first: {
        content: string;
    };
    error?: {
        first: {
            content: string;
        };
        error: Error;
    };
};
export declare class OpenAI {
    apiKey?: string;
    constructor(apiKey?: string);
    chatCompletion({ messages }: ChatCompletionArguments): Promise<{
        first: {
            content: string;
        };
        error?: {
            first: {
                content: string;
            };
            error: Error;
        };
    }>;
    updateKey(key: string): void;
}
