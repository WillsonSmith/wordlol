import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
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
    return html`
      <div class="definition-page">
        <definition-block word=${this.word}>
          ${when(this.loading, this._renderSkeletonContent, this._renderDefinition)}
        </definition-block>
      </div>
    `;
  }

  private _renderSkeletonContent = () => {
    return html`<div class="skeleton-container">
      <sl-spinner class="skeleton-container__spinner" slot="suffix"></sl-spinner>
      ${this._renderSkeletons()}
    </div> `;
  };

  private _renderSkeletons() {
    const skeletons: TemplateResult[] = [];
    const numSkeletons = Math.floor(Math.random() * 4) + 5;
    for (let i = 0; i < numSkeletons; i++) {
      skeletons.push(html`<sl-skeleton effect="pulse"></sl-skeleton>`);
    }
    return skeletons;
  }

  private _renderDefinition = () => {
    return html`<p>${this.definition}</p>`;
  };

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
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-xxs);
        margin-top: var(--spacing-xs);
      }
      .skeleton-container__spinner {
        position: absolute;
        bottom: 0;
        right: 0;
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
    'definition-route': DefinitionRoute;
  }
}
