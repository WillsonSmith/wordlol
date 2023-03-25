import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './router/app-router';

@customElement('word-genius')
export class WordGenius extends LitElement {
  render() {
    return html`
      <div>
        <app-router></app-router>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'word-genius': WordGenius;
  }
}
