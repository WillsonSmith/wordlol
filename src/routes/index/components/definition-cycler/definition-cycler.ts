import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { Definition } from './definitions';
import '../../../../components/definition-block/definition-block';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';
import SlAnimation from '@shoelace-style/shoelace/dist/components/animation/animation.js';

@customElement('definition-cycler')
export class DefinitionCycler extends LitElement {
  @property({ type: String }) direction: 'in' | 'out' = 'in';
  @property({ type: Boolean }) pause = false;

  @property({ type: Object })
  definition: Definition = {
    word: '',
    definition: '',
  };

  @property({ type: Array })
  definitions: Definition[] = [];

  @query('sl-animation')
  animation!: SlAnimation;

  firstUpdated() {
    import('./definitions').then(({ definitions }) => {
      this.definitions = definitions;
      this.cycleDefinition();
    });

    // get prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      this.pause = true;
    }
  }

  updated() {
    if (!this.pause) this.animation.play = true;
  }

  render() {
    const animationName = this.direction === 'in' ? 'fadeInLeft' : 'fadeOutRight';
    const animationEasing = this.direction === 'in' ? 'easeOutQuad' : 'easeInQuad';
    return html`
      <div class="definition-cycler">
        <sl-button
          class="definition-cycler__controls"
          variant="text"
          @click=${() => (this.pause = !this.pause)}
        >
          <sl-icon slot="suffix" name=${this.pause ? 'play-circle' : 'pause-circle'}></sl-icon>
          ${this.pause ? 'Play' : 'Pause'}
        </sl-button>
        <sl-animation
          iterations="1"
          duration="1000"
          fill="forwards"
          play
          name=${animationName}
          easing=${animationEasing}
          @sl-finish=${this._animationEnd}
        >
          <definition-block word=${this.definition.word}>
            <p>${this.definition.definition}</p>
          </definition-block>
        </sl-animation>
      </div>
    `;
  }

  private _animationEnd() {
    if (this.pause) {
      this.animation.play = false;
      return;
    }
    this.animation.play = false;
    const timeoutDelay = this.direction === 'in' ? 10000 : 150;
    setTimeout(this._animationTimeout, timeoutDelay);
  }

  private _animationTimeout = () => {
    if (this.direction === 'out') {
      this.cycleDefinition();
    }
    this.direction = this.direction === 'in' ? 'out' : 'in';
    if (this.pause) return;
    this.animation.play = true;
  };

  cycleDefinition() {
    const next = this.definitions.at(Math.floor(Math.random() * this.definitions.length));
    this.definition = next || this.definition;
  }

  static styles = [
    css`
      :host {
        display: block;
        overflow-x: hidden;
      }

      .definition-cycler {
        position: relative;
      }

      .definition-cycler__controls {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'definition-cycler': DefinitionCycler;
  }
}
