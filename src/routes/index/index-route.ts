import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('index-route')
export class IndexRoute extends LitElement {
  render() {
    return html`
      <div>
        <header class="header">
          <h1>Word Genius</h1>
        </header>
        <div class="search-form">
          <form @submit=${this._search}>
            <sl-input
              class="search-input"
              name="search"
              placeholder="Search for a word"
              type="text"
              required
            ></sl-input>
            <sl-button type="submit">Search</sl-button>
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
