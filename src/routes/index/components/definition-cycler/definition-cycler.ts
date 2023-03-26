import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { Definition } from './definitions';
import '../../../../components/definition-block/definition-block';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';
import SlAnimation from '@shoelace-style/shoelace/dist/components/animation/animation.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('definition-cycler')
export class DefinitionCycler extends LitElement {
  @property({ type: String }) direction: 'in' | 'out' = 'in';
  @property({ type: Boolean }) playing = true;
  @property({ type: Boolean }) paused = false;

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
      this.playing = false;
    }
  }

  updated(changed: Map<string, string>) {
    if (changed.has('playing')) {
      this.animation.play = this.playing;
    }
  }

  render() {
    let animationName;
    if (this.direction === 'in') animationName = 'fadeInLeft';
    if (this.direction === 'out') animationName = 'fadeOutRight';

    let animationEasing;
    if (this.direction === 'in') animationEasing = 'easeOutQuad';
    if (this.direction === 'out') animationEasing = 'easeInQuad';

    let iconName;
    if (this.paused) iconName = 'play-circle';
    if (!this.paused) iconName = 'pause-circle';

    let controlText;
    if (this.paused) controlText = 'Play';
    if (!this.paused) controlText = 'Pause';

    const definition = this.definition;
    return html`
      <div class="definition-cycler">
        <sl-button
          class="definition-cycler__controls"
          variant="text"
          @click=${this._handlePlayPause}
        >
          <sl-icon slot="suffix" name=${ifDefined(iconName)}></sl-icon>
          ${controlText}
        </sl-button>
        <sl-animation
          iterations="1"
          duration="1000"
          fill="forwards"
          play
          name=${ifDefined(animationName)}
          easing=${ifDefined(animationEasing)}
          @sl-finish=${this._animationEnd}
        >
          <definition-block word=${definition.word}>
            <p>${definition.definition}</p>
          </definition-block>
        </sl-animation>
      </div>
    `;
  }

  private _handlePlayPause() {
    this.paused = !this.paused;
    if (!this.paused) this.animation.play = true;
  }

  private _animationEnd() {
    this.playing = false;
    let delay = 10000;
    if (this.direction === 'out') delay = 150;
    setTimeout(this._animationTimeout, delay);
  }

  private _animationTimeout = () => {
    this.playing = false;
    if (this.direction === 'in') {
      this.direction = 'out';
      this.animation.name = 'fadeOutRight';
      this.animation.easing = 'easeInQuad';
      this.playing = true;
      return;
    }

    if (this.direction === 'out') {
      this.cycleDefinition();
      this.direction = 'in';
      this.animation.name = 'fadeInLeft';
      this.animation.easing = 'easeOutQuad';
      if (this.paused) {
        this.playing = false;
        return;
      }
      this.playing = true;
    }
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
