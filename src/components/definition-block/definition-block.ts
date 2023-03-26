import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
@customElement('definition-block')
export class DefinitionBlock extends LitElement {
  @property({ type: String }) word = '';
  render() {
    return html`
      <div class="definition-block__header">
        <h1 class="definition-block__word">${this._capitalize(this.word)}</h1>
        <slot name="suffix" class="slot"></slot>
      </div>
      <div class="definition-block__definition">
        <slot></slot>
      </div>
    `;
  }

  private _capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: var(--size-text-block-clamp);
        max-width: var(--size-text-block);
        font-family: var(--font-system);
      }

      .definition-block__header {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
      }

      .definition-block__word {
        flex: 1;
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-sm);
        margin: 0;
      }

      ::slotted(p) {
        margin-block: var(--spacing-xs);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'definition-block': DefinitionBlock;
  }
}
