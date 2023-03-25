import { html, css, render } from 'lit';
export const base = css`
  :root,
  :host {
    --color-background: var(--sl-color-neutral-0);
    --color-text-body: var(--sl-color-neutral-900);

    --color-primary: var(--sl-color-primary-500);
    --color-primary-light: var(--sl-color-primary-100);
    --color-primary-dark: var(--sl-color-primary-700);

    --color-secondary: var(--sl-color-secondary-500);
    --color-secondary-light: var(--sl-color-secondary-100);
    --color-secondary-dark: var(--sl-color-secondary-700);

    --font-system-sans: system-ui, Avenir, Helvetica, Arial, sans-serif;
    --font-system-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
    --font-system-monospace: Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
    --font-system: var(--font-system-sans);

    --font-size-xs: var(--sl-font-size-x-small);
    --font-size-sm: var(--sl-font-size-small);
    --font-size: var(--sl-font-size-medium);
    --font-size-lg: var(--sl-font-size-large);
    --font-size-xl: var(--sl-font-size-x-large);

    --font-weight-light: var(--sl-font-weight-light);
    --font-weight-normal: var(--sl-font-weight-normal);
    --font-weight-medium: var(--sl-font-weight-medium);
    --font-weight-semibold: var(--sl-font-weight-semibold);
    --font-weight-bold: var(--sl-font-weight-bold);

    --line-height-xs: var(--sl-line-height-denser);
    --line-height-sm: var(--sl-line-height-dense);
    --line-height: var(--sl-line-height-normal);
    --line-height-lg: var(--sl-line-height-loose);
    --line-height-xl: var(--sl-line-height-looser);

    --border-radius-none: 0;
    --border-radius-sm: var(--sl-border-radius-small);
    --border-radius: var(--sl-border-radius-medium);
    --border-radius-lg: var(--sl-border-radius-large);

    --spacing-xs: var(--sl-spacing-x-small);
    --spacing-sm: var(--sl-spacing-small);
    --spacing-base: var(--sl-spacing-medium);
    --spacing: var(--spacing-base);
    --spacing-lg: var(--sl-spacing-large);

    font-family: var(--font-system);
    line-height: var(--line-height);
    font-weight: var(--font-weight-normal);

    color: var(--color-text-body);
    background-color: var(--color-background);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;

    font-family: var(--font-system);
    line-height: var(--line-height);
    font-weight: var(--font-weight-normal);

    color: var(--color-text-body);
    background-color: var(--color-background);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
`;

render(
  html`
    <style id="styles">
      ${base}
    </style>
  `,
  document.head
);
