# Getting Started Guide

## Setup env file
Create a .env file in the root directory and placed the following variables in the file.

```
NODE_ENV=local
PORT=8000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=<any DB name you prefer>
MONGODB_URI=mongodb://localhost:27017/<MONGO_DB>
FRONTEND_BASE_URL=http://localhost:3000
```

## Setup firebase
1. Login or register a [firebase](https://firebase.google.com/)
2. Add a project or choose an existing project
3. Retrieve the `database url` by creating or choosing an existing firebase `Realtime Database` > replace the `databaseURL` in `/firebase/index.ts`
4. Click on the `setting icon`:gear: next to `Project Overview` > `Project settings` > `Service accounts` > `Node.js` > `Generate new private key` > place the downloaded `serviceAccountKey.json` file in  `/firebase` folder

## Run project
1. After setting up your env variables, run `yarn install`. Make sure you are in the root directory of the project.
2. After the packages are installed, run `yarn start`.
3. Create a database with the name you specified in .env `(MONGO_DB)` in your local db. 

## Project structure
The requests flow:
> `Routes` or `Graphql` => `Controllers` => `Service` => `Model`

Services should contain most of the db logic/query and if best should be reusable, controllers contain the business logic and should trigger the services and not trigger the models directly.

Enums, interfaces, and types should be defined in `/types` directory.

## Tools
Database Tool: Any mongodb GUI, recommended [MongoDB Compass](https://www.mongodb.com/products/compass).

## Production setup
To be changed.
1. Run `yarn build`