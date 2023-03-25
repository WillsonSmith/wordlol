import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { provide } from '@lit-labs/context';
import { storage } from '../context/storageContext';
import { Storage } from '../Storage';

@customElement('storage-provider')
export class StorageProvider extends LitElement {
  @provide({ context: storage })
  @property({ type: Object })
  storage: Storage = new Storage({
    strategy: 'localstorage',
  });

  render() {
    return html`<slot></slot>`;
  }

  static styles = [css``];
}

declare global {
  interface HTMLElementTagNameMap {
    'storage-provider': StorageProvider;
  }
}
