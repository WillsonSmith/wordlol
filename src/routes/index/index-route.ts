import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { siteName } from '../../config/site-name';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import './components/definition-cycler/definition-cycler';

@customElement('index-route')
export class IndexRoute extends LitElement {
  render() {
    return html`
      <section>
        <header><h1 class="header">${siteName}</h1></header>
        <div class="search-form">
          <form @submit=${this._search}>
            <sl-input
              class="search-input"
              name="search"
              placeholder="Invent a word"
              type="text"
              maxlength="50"
              required
              aria-label="Invent a word (search)"
              spellcheck="false"
            >
            </sl-input>
            <sl-button type="submit">Define</sl-button>
          </form>
          <definition-cycler></definition-cycler>
        </div>
      </section>
    `;
  }

  private _search(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = new FormData(form).get('search');
    if (!query) return;
    window.location.href = `/definition/${query}`;
  }

  static styles = [
    css`
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xxl);
        font-weight: var(--font-weight-medium);
        transform: translateX(calc(var(--spacing) * -1));
      }

      .search-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: var(--spacing);
      }

      definition-cycler {
        width: var(--size-text-block-clamp);
      }

      .search-form form {
        max-width: 60ch;
        width: 100%;
        display: flex;
        gap: var(--spacing-sm);
      }

      .search-input {
        flex: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'index-route': IndexRoute;
  }
}
