# create-fastify-ts

<a href="https://www.npmjs.com/package/create-fastify-ts" target="_blank"><img src="https://img.shields.io/npm/v/create-fastify-ts.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/create-fastify-ts" target="_blank"><img src="https://img.shields.io/npm/l/create-fastify-ts.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/create-fastify-ts" target="_blank"><img src="https://img.shields.io/npm/dm/create-fastify-ts.svg" alt="NPM Downloads" /></a>


This tool project helps you generate a [Fastify](https://www.fastify.io/) application with [TypeScript](https://www.npmjs.com/package/typescript) and  includes [TypeORM](https://typeorm.io) to connect to the database.

we also automatic these actions:
* initialize a git
* install the dependency packages.
# Creating the project
```
npx create-fastify-ts
```
and then you just only input your project name.

# Project Structure
`create-fastify-ts` generate a project structure for you like this:
```
YOUR APP DIRECTORY
├── README.md
├── jest.config.js
├── jest.environment.cjs
├── nodemon.json
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   ├── app.js
│   │   └── swagger.js
│   ├── controllers
│   │   ├── ping.controller.ts
│   │   └── ping.schema.ts
│   ├── models
│   │   ├── index.ts
│   │   └── item.ts
│   ├── plugins
│   │   └── db.ts
│   ├── server.ts
│   └── services
│       └── ping.service.ts
├── test
│   └── app.test.ts
└── tsconfig.json
```

# Contributing
If you feel you can help in any way, please open a pull request or open an issue.
