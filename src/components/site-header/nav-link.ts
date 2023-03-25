import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('nav-link')
export class NavLink extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: Boolean }) active = false;
  @property({ type: Boolean }) primary = false;
  @property({ type: Boolean }) external = false;

  render() {
    return html`
      <a
        href=${this.href}
        class=${classMap({
          'nav-link': true,
          'nav-link--active': this.active,
          'nav-link--primary': this.primary,
        })}
        target=${this.external ? '_blank' : '_self'}
      >
        <slot name="icon"></slot>
        <slot></slot>
      </a>
    `;
  }

  static styles = [
    css`
      .nav-link {
        display: flex;
        gap: var(--spacing-xs);
        align-items: center;
        color: var(--color-body-text);
        text-decoration: none;
        text-underline-offset: var(--spacing-xs);
        line-height: var(--line-height-sm);
      }

      .nav-link:focus {
        outline: none;
        text-decoration: underline;
      }

      .nav-link--primary {
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);
      }

      .nav-link:hover {
        text-decoration: underline;
      }

      .nav-link--active {
        text-decoration: underline;
      }

      .nav-link--active:hover {
        text-decoration: none;
      }

      .nav-link--icon {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'nav-link': NavLink;
  }
}
