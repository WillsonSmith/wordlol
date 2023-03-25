import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
export declare class DefinitionRoute extends LitElement {
    _word: string;
    definition: string;
    loading: boolean;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
    get word(): string;
    private fetchDefinition;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        'definition-route': DefinitionRoute;
    }
}
