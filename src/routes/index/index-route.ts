import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js';

@customElement('index-route')
export class IndexRoute extends LitElement {
  render() {
    return html`
      <div>
        <header class="header">
          <h1>word.lol</h1>
        </header>
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
            >
            </sl-input>
            <sl-button type="submit">Generate</sl-button>
          </form>
        </div>
      </div>
    `;
  }

  private _search(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const query = new FormData(form).get('search');
    window.location.href = `/definition/${query}`;
  }

  static styles = [
    css`
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .search-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
