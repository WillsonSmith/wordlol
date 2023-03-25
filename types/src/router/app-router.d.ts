import { LitElement } from 'lit';
import { RouterContext } from './context/router';
import '../components/site-header/site-header';
export declare class AppRouter extends LitElement {
    router: RouterContext;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'app-router': AppRouter;
    }
}
