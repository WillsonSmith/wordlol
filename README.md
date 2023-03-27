## wordlol [![Netlify Status](https://api.netlify.com/api/v1/badges/595de7a6-688e-4ec7-af8a-f5e5714c367d/deploy-status)](https://app.netlify.com/sites/word-lol/deploys)

[https://word.lol](https://word.lol)

### Invent words with wordlol
Open the page, invent a word, and get a definition.

![wordlol](https://user-images.githubusercontent.com/1087756/227804681-03d2b05c-a4b7-4686-ad5b-78220d171315.gif)

### About
wordlol is built on the [Lit](http://lit.dev) Web Component library, it randomly generates definitions by calling the [OpenAI](https://platform.openai.com/docs/guides/chat) Chat completion API, and it is bundled with [Vite](https://vitejs.dev). API calls are made with [Netlify](https://netlify.com) functions and can be substituted for any serverless function provider.


### Usage

To get started with wordlol follow these steps:

- `git clone https://github.com/WillsonSmith/wordlol.git`
- Add an `OPENAI_API_KEY` to your Environment variables (`.env` file).
  - Sign up for on [OpenAI](https://openai.com/) to get an API key.
- `npm install`
- `npm start`
  - This requires Netlify for functions. You can replace the API or run `npm run dev` to run the application without functions.
- If you use Netlify the browser should automatically open, if not, follow the link in your terminal.
- Enter a word or a phrase in the search bar and click the "Search" button.
- The application will generate a definition for the word or phrase you entered.

### Special thainks:

- [Lit](https://lit.dev) Simple. Fast. Web Components.
- [Vite](https://vitejs.dev) Next Generation Frontend Tooling
- [Shoelace](https://shoelace.style) A forward-thinking library of web components
- [OpenAI](https://platform.openai.com/docs/guides/chat) Chat completion API
- [Netlify](https://netlify.com) The fastest way to combine your favorite tools and APIs to build the fastest sites, stores, and apps for the web.
