# tsoa-hapi

## Setup

```bash
git init
yarn init -y

# tsoa, hapi
yarn add tsoa @hapi/hapi

# typescript
yarn add -D typescript @types/node @types/hapi__hapi
yarn run tsc --init --target es2021 --experimentalDecorators --outDir ./dist

# eslint
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
yarn run eslint --init
```

`tsconfig.eslint.json`

```json
{
  "compilerOptions": {
    "types": [
      "@types/node"
    ],
    "noEmit": true,
    "allowJs": true,
  },
  "extends": "./tsconfig.json",
  "include": [
    ".eslintrc.js",
    "src/**/*.ts",
    "test/**/*.ts",
  ]
}
```

`.eslintrc.js`

```javascript
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    tsConfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: true,
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false,
      },
    }],
    'require-await': 'off',
    '@typescript-eslint/require-await': 'off',
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
  },
}
```

`.eslintignore`

```
build
node_modules
```

`package.json`

```json
{
  "scripts": {
    "build": "tsc",
    "fmt": "eslint '{src,test}/**/*.ts' --fix",
    "gen": "tsoa spec-and-routes",
    "lint": "eslint '{src,test}/**/*.ts'",
    "start": "node dist/src/server.js"
  }
}
```

## Model, Service, and Controller

* create `src/users/users.ts` exporting the `User` interface
* create `src/users/users-service.ts` exporting the `UsersCreationParams` type and `UsersService` class
* create `src/users/users-controller.ts` exporting the `UsersController` class

## Creating the server

`tsoa.json`

```json
{
  "entryFile": "src/app.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*-controller.ts"],
  "spec": {
    "outputDirectory": "dist",
    "specVersion": 3
  },
  "routes": {
    "middleware": "hapi",
    "routesDir": "dist"
  }
}
```

`src/app.ts`

```typescript
import * as Hapi from '@hapi/hapi'
import { RegisterRoutes } from '../dist/routes'

export const app = (host = 'localhost', port = 3000): Hapi.Server => {
  const server = Hapi.server({ host, port })
  RegisterRoutes(server)
  return server
}
```

`src/server.ts`

```typescript
import { app } from './app'

const host = process.env.HOST || 'localhost'
const port = Number(process.env.PORT) || 3000

void app(host, port).start()
console.log(`Server running on ${host}:${port}`)
```

## Requests

```bash
yarn gen
yarn build
yarn start
```

```bash
# GET /users/{id}
curl -i http://localhost:3000/users/1 \
  -H 'Accept: application/json'

# POST /users
curl -i -X POST http://localhost:3000/users \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"email":"john@doe.com","name":"John Doe","phoneNumbers":[]}'

# automatic validation
curl -s -X POST http://localhost:3000/users \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Foo Bar"}' | jq
```
