# word.lol
[word.lol](https://word.lol)

<img width="1100" alt="image" src="https://user-images.githubusercontent.com/1087756/227752029-91df690b-f51c-47fb-9d75-a0b8fb88a8ea.png">

word.lol is a web application built with the [Lit](http://lit.dev) web framework that allows users to search for a word or a phrase and generate a definition similar to Urban Dictionary. The application uses OpenAI's ChatGPT API to randomly generate definitions. It is built on top of [Vite](https://vitejs.dev), a fast build tool for modern web applications, and has a dependency on Netlify for functions.

## Usage

To use the word.lol web application, follow these steps:

Clone the repository: git clone https://github.com/your-username/wordgenius.git
Install dependencies: npm install

- Add an `OPENAI_API_KEY` environment variable to your `.env` file. You can get an API key by signing up for an OpenAI account at https://openai.com/.
- Install dependencies `npm i`
- Start the development server: `npm start`
- Open your web browser and navigate to `http://localhost:8888`
- Enter a word or a phrase in the search bar and click the "Search" button
- The application will generate a definition similar to Urban Dictionary for the word or phrase you searched for.

## Dependencies

The word.lol web application has the following dependencies:

- [Lit](https://lit.dev): a lightweight web component library for building web applications
- [Vite](https://vitejs.dev): a fast build tool for modern web applications
- [Shoelace](https://shoelace.style): a promise-based HTTP client for making API calls
- [OpenAI](https://openai.com)'s ChatGPT API: an API that generates text based on the input prompt
- [Netlify](https://netlify.com): a cloud computing platform that provides serverless functions for web applications
Credits

The word.lol web application was built by Willson Smith and is licensed under the MIT License.
