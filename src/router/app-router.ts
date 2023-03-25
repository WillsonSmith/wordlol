import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';

import { provide } from '@lit-labs/context';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

import { router, RouterContext } from './context/router';

import '../components/site-header/site-header';

@customElement('app-router')
export class AppRouter extends LitElement {
  @provide({ context: router })
  @property({ type: Object })
  router: RouterContext = {
    routes: new Router(this, routes),
  };

  render() {
    const { routes } = this.router;
    return html`
      <site-header></site-header>
      <main>${routes.outlet()}</main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-router': AppRouter;
  }
}

const routes = [
  {
    name: 'index',
    path: '/',
    render: () => html`<index-route></index-route>`,
    enter: async () => {
      await import('../routes/index/index-route');
      return true;
    },
  },
  {
    name: 'definition',
    path: '/definition/:word',
    render: (params: { [key: string]: string | undefined }) =>
      html`<definition-route word=${ifDefined(params.word)}></definition-route>`,
    enter: async () => {
      await import('../routes/definition/definition-route');
      return true;
    },
  },
];
