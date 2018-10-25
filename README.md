# Code.hub React Project

## App details

The application is using the below technologies:

* [Webpack](https://webpack.github.io/) - for building and bundling
* [Babel.js](https://babeljs.io/) - for using ES6 features, compiling JSX, etc.
* [React](https://facebook.github.io/react/) - for building the client-side app and components
* [React Router](https://github.com/ReactTraining/react-router) - for client-side (browser) routing
* [Bootstrap](https://getbootstrap.com/) and [React-Bootstrap] - for UI
* [axios](https://github.com/axios/axios) - for HTTP requests
* [ESLint](http://eslint.org/) - for ES6 linting and best practices


## Run locally

You need to have node.js installed. For development I used node version `8.11.3` and npm version `6.4.0`, but you can use any node/npm version you want. When you are ready, you can install all dependencies and run the development servers by typing the below commands:

```
npm install
npm run api
npm start
open http://localhost:8080
```


## Build app

Build the app:

```
npm run build
```

This command will create a `dist` directory with the generated `index.html` file and the bundled JS file (`bundle.js`).


## Lint files

Lint all js/jsx files:

```
npm run lint
```

Auto-fix linting issues:

```
npm run lint:fix
```
