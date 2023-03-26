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
  @property({ type: Boolean }) playing = true;

  @property({ type: Object })
  definition: Definition = { word: '', definition: '' };

  private _definitions: Definition[] = [];
  firstUpdated() {
    import('./definitions').then(({ definitions }) => {
      this._definitions = definitions;
      this.cycleDefinition();
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      this.playing = false;
    }
  }

  render() {
    const definition = this.definition;
    return html`
      <div class="definition-cycler">
        <sl-button
          class="definition-cycler__controls"
          variant="text"
          @click=${this._handlePlaybackControls}
        >
          <sl-icon slot="suffix" name=${this.playing ? 'pause-circle' : 'play-circle'}></sl-icon>
          ${this.playing ? 'Pause' : 'Play'}
        </sl-button>
        <definition-block word=${definition.word}>
          <p>${definition.definition}</p>
        </definition-block>
      </div>
    `;
  }

  updated(changed) {
    if (changed.has('playing')) {
      if (this._animation) return;
      if (this.playing) {
        this._animateOut();
      }
    }
  }

  private _handlePlaybackControls() {
    this.playing = !this.playing;
  }

  @query('definition-block')
  private _definitionBlock?: HTMLElement;

  private _animation?: Animation;
  private _animateIn() {
    const animation = this._animation;
    if (animation) {
      animation.cancel();
      this._animation = undefined;
    }

    const definitionBlock = this._definitionBlock;
    if (!definitionBlock) return;

    const animationOptions: KeyframeAnimationOptions = {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards',
      iterations: 1,
    };

    const animationKeyframes: Keyframe[] = [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ];

    this._animation = definitionBlock.animate(animationKeyframes, animationOptions);
    this._animation.onfinish = () => {
      this._animation = undefined;
      setTimeout(() => {
        if (this.playing) this._animateOut();
      }, 8000);
    };
  }

  private _animateOut() {
    const animation = this._animation;
    if (animation) {
      animation.cancel();
      this._animation = undefined;
    }

    const definitionBlock = this._definitionBlock;
    if (!definitionBlock) return;

    const animationOptions: KeyframeAnimationOptions = {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards',
      iterations: 1,
    };

    const animationKeyframes: Keyframe[] = [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-10px)' },
    ];

    this._animation = definitionBlock.animate(animationKeyframes, animationOptions);
    this._animation.onfinish = () => {
      this._animation = undefined;
      setTimeout(() => {
        this.cycleDefinition();
      }, 150);
    };
  }

  cycleDefinition() {
    const next = this._definitions.at(Math.floor(Math.random() * this._definitions.length));
    this.definition = next || this.definition;
    this._animateIn();
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
