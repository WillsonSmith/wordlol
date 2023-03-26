import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

@customElement(`skeleton-text-block`)
export class SkeletonTextBlock extends LitElement {
  @property({ type: Number }) lines = 4;
  @property({ type: String }) effect: 'none' | 'pulse' | 'sheen' = 'pulse';
  render() {
    return html`
      <div class="skeleton-text-block">
        ${this._renderSkeletons()}
        <sl-spinner class="skeleton-text-block__spinner"></sl-spinner>
      </div>
    `;
  }

  private _renderSkeletons() {
    const skeletons: TemplateResult[] = [];
    for (let i = 0; i < this.lines; i++) {
      skeletons.push(html`<sl-skeleton effect=${this.effect}></sl-skeleton>`);
    }
    return skeletons;
  }

  static styles = [
    css`
      :host {
        display: block;
      }

      .skeleton-text-block {
        position: relative;
        display: flex;
        gap: var(--spacing-xxs);
        flex-direction: column;
      }

      .skeleton-text-block__spinner {
        position: absolute;
        bottom: var(--spacing-xxs);
        right: var(--spacing-xxs);
      }

      sl-skeleton::part(indicator) {
        height: 10px;
      }

      sl-skeleton:nth-last-child(3) {
        width: 95%;
      }
      sl-skeleton:nth-last-child(2) {
        width: 90%;
      }
      sl-skeleton:nth-last-child(1) {
        width: 85%;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'skeleton-text-block': SkeletonTextBlock;
  }
}
