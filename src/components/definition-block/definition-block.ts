import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('definition-block')
export class DefinitionBlock extends LitElement {
  @property({ type: String }) word = '';
  render() {
    return html`
      <h1 class="definition-block__word">${this.word}</h1>
      <div class="definition-block__definition">
        <slot></slot>
      </div>
    `;
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: var(--size-text-block-clamp);
        max-width: var(--size-text-block);
      }

      .definition-block__word {
        font-size: var(--font-size-xxl);
        font-weight: var(--font-weight-bold);
        line-height: var(--line-height-sm);
        margin: 0;
      }

      .definition-block__definition p {
        margin-block: var(--spacing-xxs);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'definition-block': DefinitionBlock;
  }
}
