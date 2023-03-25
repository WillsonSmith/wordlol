import { createContext } from '@lit-labs/context';
import type { Router } from '@lit-labs/router';

export interface RouteContext {
  name: string;
  path: string;
  query?: URLSearchParams;
}

export const route = createContext<RouteContext>('route');

export interface RouterContext {
  routes: Router;
}

export const router = createContext<RouterContext>('router');
