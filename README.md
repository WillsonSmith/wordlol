# Word
[website](https://word.lol)

<img width="1624" alt="Screenshot 2023-03-25 at 23 51 30" src="https://user-images.githubusercontent.com/1087756/227755141-18ae4648-5713-4bc3-bedc-360afcd5dc92.png">
<img width="1624" alt="Screenshot 2023-03-25 at 23 51 26" src="https://user-images.githubusercontent.com/1087756/227755147-b505d5f8-6009-45a0-8b60-e57e67a010f2.png">

Word is a web application built with the [Lit](http://lit.dev) web framework that allows users to search for a word or a phrase and generate a definition similar to Urban Dictionary. The application uses OpenAI's ChatGPT API to randomly generate definitions. It is built on top of [Vite](https://vitejs.dev), a fast build tool for modern web applications, and has a dependency on Netlify for functions.

## Usage

To get started with Word follow these steps:

Clone the repository: git clone https://github.com/WillsonSmith/word.git
Install dependencies: npm install

- Add an `OPENAI_API_KEY` environment variable to your `.env` file. You can get an API key by signing up for an OpenAI account at https://openai.com/.
- Install dependencies `npm i`
- Start the development server: `npm start`
- Open your web browser and navigate to `http://localhost:8888`
- Enter a word or a phrase in the search bar and click the "Search" button
- The application will generate a definition similar to Urban Dictionary for the word or phrase you searched for.

## Dependencies

The Word web application has the following dependencies:

- [Lit](https://lit.dev): a lightweight web component library for building web applications
- [Vite](https://vitejs.dev): a fast build tool for modern web applications
- [Shoelace](https://shoelace.style): a promise-based HTTP client for making API calls
- [OpenAI](https://openai.com)'s ChatGPT API: an API that generates text based on the input prompt
- [Netlify](https://netlify.com): a cloud computing platform that provides serverless functions for web applications
Credits

The word web application was built by Willson Smith and is licensed under the MIT License.
