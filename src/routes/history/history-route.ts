import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('history-route')
export class HistoryRoute extends LitElement {
  render() {
    return html`History`;
  }

  static styles = [css``];
}

declare global {
  interface HTMLElementTagNameMap {
    'history-route': HistoryRoute;
  }
}
