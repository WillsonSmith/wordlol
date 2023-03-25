import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './site-nav';

@customElement('site-header')
export class SiteHeader extends LitElement {
  render() {
    return html`
      <header class="site-header">
        <site-nav></site-nav>
      </header>
    `;
  }

  static styles = [css``];
}

declare global {
  interface HTMLElementTagNameMap {
    'site-header': SiteHeader;
  }
}
