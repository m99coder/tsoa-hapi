# tsoa-hapi

## Setup

```bash
git init
yarn init -y

# tsoa, hapi
yarn add tsoa @hapi/hapi

# typescript
yarn add -D typescript @types/node @types/hapi
yarn run tsc --init --experimentalDecorators

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
    "fmt": "eslint '{src,test}/**/*.ts' --fix",
    "lint": "eslint '{src,test}/**/*.ts'"
  }
}
```

`tsoa.json`

```json
{
  "entryFile": "src/index.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/**/*-controller.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "build"
  }
}
```

## Model, Service, and Controller

* create `src/users/users.ts` exporting the `User` interface
* create `src/users/users-service.ts` exporting the `UsersCreationParams` type and `UsersService` class
* create `src/users/users-controller.ts` exporting the `UsersController` class
