import { LitElement, html, css, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import './nav-link';

@customElement('site-nav')
export class SiteNav extends LitElement {
  render() {
    return html`
    ${map(
      this.siteLinks,
      (link) => html`
        <nav-link ?primary=${link.primary} href=${link.href}> ${link.label} </nav-link>
      `,
    )}
        <div class="site-nav__social">
          ${map(
            this.socialLinks,
            (link) => html`
              <nav-link href=${link.href} external>
                ${link.icon ? html`<sl-icon slot="icon" name=${link.icon}></sl-icon>` : nothing}
                ${link.label}
              </nav-link>
            `,
          )}
        </div>
      </nav>
    `;
  }

  private get siteLinks() {
    return [
      {
        href: '/',
        label: 'Word Genius',
        primary: true,
      },
    ].filter((link) => link.href !== window.location.pathname);
  }

  private get socialLinks() {
    return [
      {
        href: 'https://github.com/willsonsmith',
        label: 'GitHub',
        icon: 'github',
      },
      {
        href: 'https://willsonsmith.com',
        label: 'willsonsmith.com',
        icon: 'globe',
      },
    ];
  }

  static styles = [
    css`
      :host {
        display: flex;
        gap: var(--spacing-xs);
        align-items: center;
        min-height: 45px;
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
