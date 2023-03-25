import { LitElement } from 'lit';
import { RouteContext, RouterContext } from './context/router';
import '../components/site-header/site-header';
export declare class AppRouter extends LitElement {
    route: RouteContext;
    router: RouterContext;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'app-router': AppRouter;
    }
}
