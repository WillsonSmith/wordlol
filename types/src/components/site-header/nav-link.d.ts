import { LitElement } from 'lit';
export declare class NavLink extends LitElement {
    href: string;
    active: boolean;
    primary: boolean;
    external: boolean;
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'nav-link': NavLink;
    }
}
