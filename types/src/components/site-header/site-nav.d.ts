import { LitElement } from 'lit';
import './nav-link';
export declare class SiteNav extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    private get siteLinks();
    private get socialLinks();
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'site-nav': SiteNav;
    }
}
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
