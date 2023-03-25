import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './nav-link';

@customElement(`site-nav`)
export class SiteNav extends LitElement {
  render() {
    return html`
        <nav-link primary href="/">Word Genius</nav-link>
        <div class="site-nav__social">
          <nav-link href="http://github.com/willsonsmith" target="_blank"><sl-icon slot="icon" name="github"></sl-icon>GitHub</nav-link>
          <nav-link href="http://willsonsmith.com" target="_blank" ><sl-icon name="globe"></sl-icon>willsonsmith.com</nav-link>
        </div>
      </nav>
    `;
  }

  static styles = [
    css`
      :host {
        display: flex;
        gap: var(--spacing-xs);
        align-items: center;
      }

      .site-nav__social {
        flex: 1;
        display: flex;
        gap: var(--spacing-sm);
        justify-content: flex-end;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'site-nav': SiteNav;
  }
}

import '@shoelace-style/shoelace/dist/components/icon/icon.js';
