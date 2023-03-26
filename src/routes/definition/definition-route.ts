import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '../../components/definition-block/definition-block';

import type { ServerlessAPIResponse } from '../../../functions/search.js';

@customElement('definition-route')
export class DefinitionRoute extends LitElement {
  @property({ type: String, attribute: 'word' }) _word = '';
  @property({ type: String }) definition = '';
  @property({ type: Boolean }) loading = true;

  firstUpdated() {
    this.fetchDefinition();
  }

  render() {
    const skeletonEffect = 'pulse';
    return html`
      <div class="definition-page">
        <definition-block word=${this.word}>
          ${when(
            this.loading,
            () => html`
              <div class="skeleton-container">
                <sl-skeleton effect=${skeletonEffect}></sl-skeleton>
                <sl-skeleton effect=${skeletonEffect}></sl-skeleton>
                <sl-skeleton effect=${skeletonEffect}></sl-skeleton>
                <sl-skeleton effect=${skeletonEffect}></sl-skeleton>
                <sl-skeleton effect=${skeletonEffect}></sl-skeleton>
                <sl-skeleton effect=${skeletonEffect}></sl-skeleton>
              </div>
            `,
            () => html` <p>${this.definition}</p> `,
          )}
        </definition-block>
      </div>
    `;
  }

  get word() {
    return decodeURIComponent(this._word);
  }

  private async fetchDefinition() {
    this.loading = true;
    try {
      const response = await fetch(`/api/search?term=${this.word}`);
      const data: ServerlessAPIResponse = await response.json();
      this.definition = data.results[0].content;
    } catch (error) {
      this.definition = 'There was an error generating the definition.';
    }
    this.loading = false;
  }

  static styles = [
    css`
      p {
        margin-block: var(--spacing-xxs);
      }
      .definition-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
      }
      .skeleton-container {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xxs);
        margin-top: var(--spacing-xs);
      }

      sl-skeleton::part(base) {
        align-items: center;
      }
      sl-skeleton::part(indicator) {
        height: 10px;
      }

      .skeleton-with-spinner {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs);
        width: 50%;
      }

      sl-skeleton:nth-of-type(6) {
        width: 85%;
      }
      sl-skeleton:nth-of-type(5) {
        width: 90%;
      }
      sl-skeleton:nth-of-type(4) {
        width: 95%;
      }

      sk-
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'definition-route': DefinitionRoute;
  }
}
