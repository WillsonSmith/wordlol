import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import type { Definition } from './definitions';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '../../../../components/skeleton-text-block/skeleton-text-block';
import '../../../../components/definition-block/definition-block';
@customElement('definition-cycler')
export class DefinitionCycler extends LitElement {
  @property({ type: Boolean }) playing = true;
  @property({ type: Number }) index = 0;
  @property({ type: String }) word = 'Dorsolio';

  @property({ type: Object })
  definition: Definition = { word: '', definition: '' };

  firstUpdated() {
    this.content = this._generateDefinition(this.word);
    // this.playing = true;
    // this._animateIn();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      this.playing = false;
    }

    const [firstWord, ...rest] = WORDS_TO_GENERATE_FOR;

    this._generateDefinition(firstWord).then((definition) => {
      setTimeout(() => {
        this.playing = true;
        this._animateIn();
      }, 600);
    });

    // for (const word of WORDS_TO_GENERATE_FOR) {
    //   this._generateDefinition(word);
    // }
  }

  private _definitionCache = new Map();

  private async _generateDefinition(word: string) {
    if (this._definitionCache.has(word)) {
      return this._definitionCache.get(word);
    }

    const response = await fetch(`/api/search?term=${word}`);
    const data = await response.json();
    const definition = data.results[0];
    this._definitionCache.set(word, definition.content);
    return definition.content;
  }

  private async _defineNextWord() {
    let nextWord = WORDS_TO_GENERATE_FOR[WORDS_TO_GENERATE_FOR.indexOf(this.word) + 1];
    if (!nextWord) nextWord = WORDS_TO_GENERATE_FOR[0];
    return this._generateDefinition(nextWord);
  }

  @property() content?: Promise<string>;

  render() {
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

        <definition-block word=${this.word}>
          <p>${until(this.content, this._renderSkeletons())}</p>
        </definition-block>
      </div>
    `;
  }

  private _renderSkeletons() {
    const numberOfSkeletons = Math.floor(Math.random() * 3) + 5;
    return html` <skeleton-text-block lines=${numberOfSkeletons}></skeleton-text-block> `;
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('word')) {
      this.content = this._generateDefinition(this.word);
    }
  }

  private _handlePlaybackControls() {
    this.playing = !this.playing;
  }

  @query('definition-block')
  private _definitionBlock?: HTMLElement;

  private _animation?: Animation;
  private async _animateIn() {
    const definitionBlock = this._definitionBlock;
    if (!definitionBlock) return;

    const animationOptions: KeyframeAnimationOptions = {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards',
      iterations: 1,
    };

    const animationKeyframes: Keyframe[] = [
      { opacity: 0, transform: 'translateY(10px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ];

    this._animation = definitionBlock.animate(animationKeyframes, animationOptions);
    this._animation.onfinish = async () => {
      this._animation = undefined;
      await this._defineNextWord();
      setTimeout(() => {
        if (this.playing) this._animateOut();
      }, 10000);
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
      easing: 'ease-in',
      fill: 'forwards',
      iterations: 1,
    };

    const animationKeyframes: Keyframe[] = [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-10px)' },
    ];

    this._animation = definitionBlock.animate(animationKeyframes, animationOptions);
    this._animation.onfinish = () => {
      let nextWord = WORDS_TO_GENERATE_FOR[WORDS_TO_GENERATE_FOR.indexOf(this.word) + 1];
      if (!nextWord) nextWord = WORDS_TO_GENERATE_FOR[0];

      this.word = nextWord;
      this._animation = undefined;
      setTimeout(() => {
        this._animateIn();
      }, 150);
    };
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

const WORDS_TO_GENERATE_FOR = [
  'Dorsolio',
  'Crambunctious',
  'Grumbletonian',
  'Drizzledorf',
  'Frizzix',
  'Piffleberry',
];
