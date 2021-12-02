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

`.eslintrc`

```
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
}
```

`.eslintignore`

```
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
