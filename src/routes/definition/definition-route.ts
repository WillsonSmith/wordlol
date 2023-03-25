import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

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
          ${when(
            this.loading,
            () => html`<sl-spinner></sl-spinner>`,
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
      .definition-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-xs);
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'definition-route': DefinitionRoute;
  }
}
