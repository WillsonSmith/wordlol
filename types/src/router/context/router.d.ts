import type { Router } from '@lit-labs/router';
export interface RouteContext {
    name: string;
    path: string;
    query?: URLSearchParams;
}
export declare const route: {
    __context__: RouteContext;
};
export interface RouterContext {
    routes: Router;
}
export declare const router: {
    __context__: RouterContext;
};
