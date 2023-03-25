export type ServerlessAPIResponse = {
    results: {
        content: string;
    }[];
};
import { Handler } from '@netlify/functions';
export declare const handler: Handler;
