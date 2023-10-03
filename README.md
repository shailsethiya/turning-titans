# React-Redux Project
 Project description here
## Prerequisite

> - NodeJS v16.14.2
> - npm v8.5.5
> - Prettier - code formatter extension vscode
> - Naming convention - Use camelCase for every folder name, functions, methods & PascalCase for every Components. Also use jsx extension for component

### Version

> - ReactJS v18.2.0
> - React-Dom v18.2.0
> - React-Router-Dom V6.3.0,
> - Redux v8.0a.2

## Take Clone of project

> - git clone REPOSITORY_URL
> - git checkout -b YOUR_BRANCH
> - git pull origin DEVELOP_BRANCH
> - create an .env file and copy the code from the .env.sample file and paste it into the .env file 

### Docker

Use docker to up and down your project locally.

`npm run docker:up-dev :- ` This cmd is use to up your application using docker in forground mode you able to see logs of react.

`npm run docker:up :- ` This cmd is use to up your application using docker in background mode or at production.

`npm run docker:down :- ` This cmd is use to down your application using docker.

`npm run docker:stop :- ` This cmd is use to Stops running containers without removing them.

`npm run docker:restart :- ` This cmd is use to Restarts all stopped and running services, or the specified services only.


## Available Scripts

In the project directory, you can run:

### `yarn` or `npm install`

To install all dependencies 

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


## Folder structure
We used below directory structure in our project.

```
 Reaxt-Redux
    ├── src
    |   ├── api
    |   |     └── routes.js
    |   |     └── index.js
    |   ├── assets
    │   │       ├── css
    │   │       │       └── style.css
    │   │       ├── fonts
    │   │       ├── images
    │   |          └── scss
    │   |          └── style.scss
    |   ├── components
    |   |      ├── layout
    |   |      |    └── Header.jsx
    |   |      |    └── Layout.jsx
    |   |      |    └── Sidebar.jsx
    |   |      ├──input
    |   |      | └── BtnMain.js
    |   |      | └── Checkbox.js
    |   |      | └── TextField.jsx
    |   ├── config
    |   |     └──  index.js
    |   |
    |   ├── pages
    │   |    ├── home
    │   |    │       └── Home.jsx
    │   |    ├── FourZeoFour
    │   |    │       └── FourZeoFour.jsx
    |   |    |── auth
    │   |    │       └── Login.jsx
    |   |    |  
    |   ├──  routes
    │   |     ├── Path.js
    │   |     │     
    │   |     ├── PrivateRoutes.js
    │   |     │      
    |   |     |── GuestRoutes.js
    │   |     │      
    |   |     |── Routes.js
    |   |     | 
    |   |    
    │   ├── store
    │   |    ├── actions
    │   |    │       ├── auth.js
    │   |    │       ├── types.js
    │   |    │       ├── ui.js
    │   |    │       ├── user.js
    │   |    │       └── index.js
    │   |    ├── reducers
    │   |    │      └── ui.js
    │   |    │      └── user.js
    │   |    |      └── index.js
    |   ├── utils
    │   |     └── Functions.js
    │   |     └── ErrorMessgaes.js
    │   |     └── index.js
    |   ├── App.js
    |   ├── index.js
    |         
    |         
    ├── public
    │      
    │      
    ├── .env.sample
    ├── .gitignore
    ├── package.json
    ├── README.md
    └── sonar-project.properties
```

#### Here's a quick overview for folder.

`/api :- ` Api call related functions.

`/components :- ` Independent and reusable bits of code.

`/config :- ` Projects config files.

`/pages :- ` Its contains all react.js routes pages files.

`/public/policy.html :- ` Used fo apply privacy and policy of your projects.

`/public/robots.txt :- ` Its contains code releted to allow and disallow your pages for google crowler.

`/store :- ` Its contains redux methods like action, reducer and store.

`/routes :- ` Its contains all private and public routes.

`/utils :- ` Javascript related functions, validations and etc.

`.env.sample :-` Its devlopment environment configuration files for our project.

`.gitignore :-` Git file ignore config files.

`package.json :-` this file holds various metadata relevant to the project.

`README.md :-` It's a set of useful information about a project and a kind of manual.

`sonar-project.properties :-` Its sonarqube (testing tool) configuration files.

> - Naming convention - Use camelCase for every folder name, functions, methods & PascalCase for every Components
> - Use prettier code formatter extension
> - Tab space - 2

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)