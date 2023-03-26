import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import '../../../../components/skeleton-text-block/skeleton-text-block';
import '../../../../components/definition-block/definition-block';
@customElement('definition-cycler')
export class DefinitionCycler extends LitElement {
  private _animation?: Animation;
  private _definitionCache: Map<string, Promise<string>> = new Map();

  @property({ type: Boolean, attribute: false }) playing = true;
  @property({ type: String, attribute: false }) word = 'Dorsolio';
  @property() content: Promise<string> = this._defineWord(this.word);
  @query('definition-block')
  private _definitionBlock?: HTMLElement;

  async firstUpdated() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      this.playing = false;
    }

    this.content.then(() => {
      if (this.playing) {
        this._defineNextWord();
        this.playing = true;
        setTimeout(() => {
          this._animateOut();
        }, 4000);
      }
    });
  }

  render() {
    return html`
      <div class="definition-cycler">
        <sl-button
          class="definition-cycler__controls"
          variant="text"
          @click=${this._handlePlaybackControls}
        >
          <sl-icon slot="suffix" name=${this.playing ? 'pause-circle' : 'play-circle'}></sl-icon>
          ${this.playing ? 'Pause' : 'Resume'}
        </sl-button>

        <definition-block word=${this.word}>
          <p>${until(this._defineWord(this.word), this._renderSkeletons())}</p>
        </definition-block>
      </div>
    `;
  }

  private _renderSkeletons() {
    const numberOfSkeletons = Math.floor(Math.random() * 3) + 5;
    return html` <skeleton-text-block lines=${numberOfSkeletons}></skeleton-text-block> `;
  }
  private async _defineWord(word: string) {
    if (this._definitionCache.has(word)) {
      return this._definitionCache.get(word);
    }
    const definition = fetch(`/api/search?term=${word}`)
      .then((response) => response.json())
      .then(({ results }) => results[0].content);
    this._definitionCache.set(word, definition);
    return definition;
  }

  private async _defineNextWord() {
    let nextWord = WORDS_TO_GENERATE_FOR[WORDS_TO_GENERATE_FOR.indexOf(this.word) + 1];
    if (!nextWord) nextWord = WORDS_TO_GENERATE_FOR[0];
    return this._defineWord(nextWord);
  }

  private get _nextWord() {
    let nextWord = WORDS_TO_GENERATE_FOR[WORDS_TO_GENERATE_FOR.indexOf(this.word) + 1];
    if (!nextWord) nextWord = WORDS_TO_GENERATE_FOR[0];
    return nextWord;
  }

  private _handlePlaybackControls() {
    this.playing = !this.playing;
    if (!this._animation && this.playing) {
      this._animateOut();
    }
  }

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
      { opacity: 0, transform: 'translateY(var(--spacing-sm))' },
      { opacity: 1, transform: 'translateY(0)' },
    ];

    this._animation = definitionBlock.animate(animationKeyframes, animationOptions);
    this._animation.onfinish = async () => {
      this._animation = undefined;
      this._defineNextWord();
      setTimeout(() => {
        if (this.playing) this._animateOut();
      }, 10000);
    };
  }

  private _animateOut() {
    if (!this._definitionBlock) return;
    const animationOptions: KeyframeAnimationOptions = {
      duration: 500,
      easing: 'ease-in',
      fill: 'forwards',
      iterations: 1,
    };
    const animationKeyframes: Keyframe[] = [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(calc(var(--spacing-sm) * -1)' },
    ];

    this._animation = this._definitionBlock.animate(animationKeyframes, animationOptions);
    this._animation.onfinish = () => {
      this.word = this._nextWord;
      this.content = this._defineWord(this._nextWord);
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
  'Frizzix',
  'Piffleberry',
];
