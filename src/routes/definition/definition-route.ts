import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

import { OpenAI } from '../../libraries/OpenAI';

@customElement(`definition-route`)
export class DefinitionRoute extends LitElement {
  openAI: OpenAI = new OpenAI();
  @property({ type: String, attribute: 'word' }) _word = '';
  @property({ type: String }) definition = '';
  @property({ type: Boolean }) loading = true;

  firstUpdated() {
    this.fetchDefinition();
  }

  render() {
    return html`
      <nav class="navigation">
        <a href="/">Word Genius</a>
      </nav>
      <div class="definition-page">
        <h1>${this.word}</h1>
        <div class="definition">
          ${when(
            this.loading,
            () => html`<sl-spinner></sl-spinner>`,
            () => html` <p>${this.definition}</p> `
          )}
        </div>
      </div>
    `;
  }

  get word() {
    return decodeURIComponent(this._word);
  }

  private async fetchDefinition() {
    this.loading = true;
    const response = await this.openAI.chatCompletion({
      messages: [
        {
          role: 'user',
          content: `Invent a new definition for "${this.word}" in the style of Urban Dictionary.`,
        },
      ],
    });
    this.loading = false;

    this.definition = response?.first.content;
  }

  static styles = [
    css`
      .navigation a {
        display: block;
        color: var(--color-body-text);
        font-size: var(--font-size-xl);
        font-weight: var(--font-weight-bold);

        text-decoration: underline;
        text-underline-offset: var(--spacing-xs);
        padding: var(--spacing-sm);
      }
      .definition-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .definition {
        max-width: 60ch;
      }

      h1,
      p {
        margin: 0;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'definition-route': DefinitionRoute;
  }
}
