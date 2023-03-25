import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement(`site-nav`)
export class SiteNav extends LitElement {
  render() {
    return html`
        <a href="/" class="site-nav__link site-nav__link--home">Word Genius</a>
        <div class="site-nav__social">
          <a href="http://github.com/willsonsmith" target="_blank" class="site-nav__link site-nav__link--icon"><sl-icon name="github"></sl-icon>GitHub</a>
          <a href="http://willsonsmith.com" target="_blank" class="site-nav__link site-nav__link--icon"><sl-icon name="globe"></sl-icon>willsonsmith.com</a>
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
      .site-nav__link {
        display: block;
        color: var(--color-body-text);

        text-decoration: none;
        text-underline-offset: var(--spacing-xs);
        padding: var(--spacing-sm);
      }

      .site-nav__link--home {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
        text-decoration: underline;
      }

      .site-nav__social {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }

      .site-nav__link--icon {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
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
