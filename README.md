# tsoa-hapi

## Setup

```bash
git init
yarn init -y

# tsoa, hapi
yarn add tsoa @hapi/hapi

# typescript
yarn add -D typescript @types/node @types/hapi
yarn run tsc --init

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
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
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
