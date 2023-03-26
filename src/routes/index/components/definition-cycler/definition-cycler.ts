import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { Definition } from './definitions';
import { when } from 'lit/directives/when.js';
import '../../../../components/definition-block/definition-block';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '@shoelace-style/shoelace/dist/components/animation/animation.js';
import SlAnimation from '@shoelace-style/shoelace/dist/components/animation/animation.js';

@customElement('definition-cycler')
export class DefinitionCycler extends LitElement {
  @property({ type: Boolean }) transitioning = false;
  @property({ type: Boolean }) paused = false;
  @property({ type: Boolean }) out = false;
  @property({ type: Boolean }) in = true;

  @property({ type: Object })
  definition: Definition = { word: '', definition: '' };

  @property({ type: Array })
  definitions: Definition[] = [];

  @query('sl-animation')
  animation!: SlAnimation;

  firstUpdated() {
    import('./definitions').then(({ definitions }) => {
      this.definitions = definitions;
      this.cycleDefinition();
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      this.paused = true;
    }
  }

  updated(changed: Map<string, string>) {
    if (changed.has('paused')) {
      if (this.paused) {
        if (!this.transitioning) {
          this.animation.play = false;
        }
      }
      if (!this.paused) {
        if (!this.transitioning) {
          this.animation.play = true;
        }
      }
    }

    if (changed.has('transitioning')) {
      if (!this.transitioning) {
        if (this.paused) {
          this.animation.play = false;
        }
      }
    }
  }

  render() {
    const definition = this.definition;
    return html`
      <div class="definition-cycler">
        <sl-button
          class="definition-cycler__controls"
          variant="text"
          @click=${this._handleControlClick}
        >
          <sl-icon
            slot="suffix"
            name=${when(
              this.paused,
              () => 'play-circle',
              () => 'pause-circle',
            )}
          ></sl-icon>
          ${when(
            this.paused,
            () => 'Resume',
            () => 'Pause',
          )}
        </sl-button>
        <sl-animation
          iterations="1"
          duration="1000"
          fill="forwards"
          play
          name=${when(
            this.in,
            () => 'fadeInLeft',
            () => 'fadeOutRight',
          )}
          easing=${when(
            this.in,
            () => 'easeOutQuad',
            () => 'easeInQuad',
          )}
          @sl-start=${this._animationStart}
          @sl-finish=${this._animationEnd}
        >
          <definition-block word=${definition.word}>
            <p>${definition.definition}</p>
          </definition-block>
        </sl-animation>
      </div>
    `;
  }

  private _handleControlClick() {
    this.paused = !this.paused;
  }

  private _animationStart() {
    this.transitioning = true;
  }

  private _animationEnd() {
    this.animation.play = false;

    setTimeout(
      () => {
        this._registerNextCycle();
      },
      this.in ? 10000 : 150,
    );
  }

  private _registerNextCycle() {
    if (this.out) {
      this.cycleDefinition();
      this.in = true;
      this.out = false;
      this.animation.play = true;
    } else {
      if (this.in) {
        this.out = true;
        this.in = false;
      }
    }
    if (!this.paused) {
      this.animation.play = true;
    }
  }

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
