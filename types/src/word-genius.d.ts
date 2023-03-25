import { LitElement } from 'lit';
import './router/app-router';
export declare class WordGenius extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'word-genius': WordGenius;
    }
}
