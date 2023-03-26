## wordlol
[https://word.lol](https://word.lol)

Invent words in an instant with wordlol
wordlol generates

wordlol is a web application built with the [Lit](http://lit.dev) web framework that allows users to search for a word or a phrase and generate a definition similar to Urban Dictionary. The application uses OpenAI's ChatGPT API to randomly generate definitions. It is built on top of [Vite](https://vitejs.dev), a fast build tool for modern web applications, and has a dependency on Netlify for functions.


<img width="1624" alt="Screenshot 2023-03-25 at 23 51 30" src="https://user-images.githubusercontent.com/1087756/227755141-18ae4648-5713-4bc3-bedc-360afcd5dc92.png">
<img width="1624" alt="Screenshot 2023-03-25 at 23 51 26" src="https://user-images.githubusercontent.com/1087756/227755147-b505d5f8-6009-45a0-8b60-e57e67a010f2.png">


### Usage

To get started with wordlol follow these steps:

Clone the repository: git clone https://github.com/WillsonSmith/word.git
Install dependencies: npm install

- Add an `OPENAI_API_KEY` environment variable to your `.env` file. You can get an API key by signing up for an OpenAI account at https://openai.com/.
- Install dependencies `npm i`
- Start the development server: `npm start`
- Open your web browser and navigate to `http://localhost:8888`
- Enter a word or a phrase in the search bar and click the "Search" button
- The application will generate a definition similar to Urban Dictionary for the word or phrase you searched for.

### Special thainks:

- [Lit](https://lit.dev): Simple. Fast. Web Components.
- [Vite](https://vitejs.dev): Next Generation Frontend Tooling
- [Shoelace](https://shoelace.style): A forward-thinking library of web components
- [OpenAI](https://platform.openai.com/docs/guides/chat) Chat completion API
- [Netlify](https://netlify.com): The fastest way to combine your favorite tools and APIs to build the fastest sites, stores, and apps for the web.

The word web application was built by Willson Smith and is licensed under the MIT License.
