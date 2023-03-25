import { LitElement } from 'lit';
import './site-nav';
export declare class SiteHeader extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'site-header': SiteHeader;
    }
}
