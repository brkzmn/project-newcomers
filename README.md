`TODO: Add a nice screenshot of the app!`

# Class 35 final project

This is the final project for the HackYourFuture curriculum we did as a class using the MERN stack by following the agile methodology with our team and a group of mentors. A quick guide to what we built:

<img src="./client/src/images/demo.gif">

> NlLink is a social network platform to connect locals and newcomers in the Netherlands. Users match based on their interests and province, messaging between users and create and join the events are core features of NlLink.

> [Click here for the Demo version](https://c35-newcomers-develop.herokuapp.com/)

## 1. Setup

First, to setup all the directories run the following in the main directory:

`npm install`

`npm run setup`

The first command will install `cypress` and some small libraries needed for running the rest of the commands. The second will go into the `client` and `server` directories and set those up to be ran.

In the `client` and `server` directory there are two `.env.example` files. Create a copy and rename that to `.env`. Then follow the instructions in those files to fill in the right values.

To run the app in dev mode you can run the following command in the main directory:

`npm run dev`

## 2. Code structure

```
client
├── public
└── src
|   └── __tests__
|   └── __testUtils__
|   └── components
|   └── hooks
|   └── pages
|       └── __tests__
|       └── components
|   └── util
|   index.jsx
cypress
|   └── fixtures
|   └── integration
|   └── plugins
|   └── support
server
└── src
    └── __tests__
    └── __testUtils__
    └── controllers
    └── db
    └── models
    └── routes
    └── util
    index.js
```

## 🛠️ Used tools and languages

![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=JavaScript&color=F7DF1E)
![](https://img.shields.io/badge/Code-HTML5-informational?style=flat&logo=HTML5&color=E34F26)
![](https://img.shields.io/badge/Style-CSS3-informational?style=flat&logo=CSS3&color=1572B6)
![](https://img.shields.io/badge/Code-React-informational?style=flat&logo=React&color=2bbc8a)
![](https://img.shields.io/badge/Code-Node.js-informational?style=flat&logo=Node.js&color=darkgreen)
![](https://img.shields.io/badge/Code-express-informational?style=flat&logo=Express.js&color=darkgreen)
![](https://img.shields.io/badge/Tools-Git-informational?style=flat&logo=Git&color=F05032)
![](https://img.shields.io/badge/Tools-Netlify-informational?style=flat&logo=netlify&color=00C7B7)
![](https://img.shields.io/badge/Tools-GitHub-informational?style=flat&logo=GitHub&color=181717)
![](https://img.shields.io/badge/Database-mongoDB-informational?style=flat&logo=mongoDB&color=GREEN)
![](https://img.shields.io/badge/Tools-VSCode-informational?style=flat&logo=visualstudiocode&color=1572B6)
![](https://img.shields.io/badge/Tools-heroku-informational?style=flat&logo=heroku&color=1572B6)

### 2.1 Client structure

- `public` || public facing client code
- `__tests__` || any `jest` tests for specific components will be in a `__tests__` folder on the same level
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `components` || all of our shared components that are used over multiple pages
- `hooks` || all of our custom hooks
- `pages` || the page components of our app, any routing will go between these components
- `pages/components` || components used specifically on those pages
- `util` || any utility functions that can be used anywhere on the client side
- `index.jsx` || the start point of the client

### 2.2 Cypress structure

- `fixtures` || any data/files that `cypress` needs can be placed here
- `integration` || all of our tests are in here, separated in folders based on the pages in our app
- `plugins` || any plugins for our `cypress` configuration can be placed here
- `support` || custom commands and other support files for `cypress` can be placed here

### 2.3 Server structure

- `__tests__` || any `jest` tests for the api endpoints as that is our testing strategy for the backend
- `__testUtils__` || any code that is only being used in the tests is put in the `__testUtils__` folder to separate that away from the rest of the code
- `controllers` || all of our controller functions that interact with the database
- `db` || all of our configuration for the database
- `models` || all of our `mongoose` models will be placed here
- `routes` || code to match up the API with our controllers
- `util` || any utility functions that can be used anywhere on the server side
- `index.js` || the start point of the server

## 3. Stack / external libraries

The base stack of the app is a MERN stack (Mongoose, Express, React, Node). Next to that we make use of the following extras:

### 3.1 Configuration libraries

- `dotenv` || To load the .env variables into the process environment. See [docs](https://www.npmjs.com/package/dotenv)
- `webpack` / `html-webpack-plugin` || To bundle our React app and create a static app to host. See [docs](https://webpack.js.org/)
- `husky` || To run our tests and linter before committing. See [docs](https://typicode.github.io/husky/#/)
- `eslint` || To check our code. We have different configurations for frontend and backend. You can check out the configuration in the `.eslintrc.(c)js` files in the respective `client` and `server` folders. See [docs](https://eslint.org/)
- `prettier` || To automatically format our code. See [docs](https://prettier.io/)
- `concurrently` || To run commands in parallel. See [docs](https://github.com/open-cli-tools/concurrently#readme)

For more information on how these work together including the automatic deployment to heroku, have a look at our detailed [DEV](./DEV.md) file.

### 3.2 Client-side libraries

- `@testing-library/*` || We use React Testing Library to write all of our tests. See [docs](https://testing-library.com/docs/react-testing-library/intro/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `jest-fetch-mock` || To mock out the backend for our testing purposes. See [docs](https://github.com/jefflau/jest-fetch-mock#readme)
- `buffer` || To provide the buffer module from node.js, for the browser. See [docs](https://github.com/feross/buffer#readme)
- `prop-types` || To document the intended types of properties passed to components. See [docs](https://github.com/facebook/prop-types)
- `react-dark-mode-toggle` || A super cutesy dark mode toggle button for React. See [docs](https://github.com/cawfree/react-dark-mode-toggle#readme)
- `react-icons` || To provide beautiful icons in React. See [docs](https://github.com/react-icons/react-icons#readme)
- `react-input-emoji` || A React input with an option to pick emojis. See [docs](https://https://github.com/cesarwbr/react-input-emoji#readme)
- `react-phone-number-input` || International phone number input for React. See [docs](https://gitlab.com/catamphetamine/react-phone-number-input/-/blob/master/README.md)
- `react-scroll` || React component for animating vertical scrolling. See [docs](https://https://github.com/fisshy/react-scroll#readme)
- `react-toastify` || Allows you to add notifications to your app with ease. See [docs](https://github.com/fkhadra/react-toastify#readme)

### 3.3 Server-side libraries

- `nodemon` || To automatically restart the server when in development mode. See [docs](https://nodemon.io/)
- `jest` || To run our tests and coverage. See [docs](https://jestjs.io/)
- `supertest` || To more easily test our endpoints. See [docs](https://github.com/visionmedia/supertest#readme)
- `mongodb-memory-server` || To mock out our database in our backend tests. See [docs](https://github.com/nodkz/mongodb-memory-server)
- `cors` || To open up our API. See [docs](https://github.com/expressjs/cors#readme)
- `mongoose` || To add schemas to our database. See [docs](https://mongoosejs.com/)
- `jsonwebtoken` || To sign and verify the authorization token. See [docs](https://github.com/auth0/node-jsonwebtoken#readme)
- `aws-sdk` || To store Imaged at amazon web service. See [docs](https://github.com/aws/aws-sdk-js#readme)
- `bcrypt` || To hash users passwords before saving in the database. See [docs](https://github.com/kelektiv/node.bcrypt.js#readme)
- `cors` || To provide a Connect/Express middleware that can be used to enable CORS with various options. See [docs](https://github.com/expressjs/cors#readme)
- `multer` || To handle multipart form/data, used for uploading files. See [docs](https://github.com/expressjs/multer#readme)
- `socket.io` || To enable real-time bidirectional event-based communication, used for messaging section. See [docs](https://github.com/socketio/socket.io#readme)
- `nodemailer` || To send E-mails from node.js. See [docs](https://github.com/nodemailer/nodemailer#readme)
