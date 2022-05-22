# eslint-config-iinitz

ESLint config base on [eslint-config-airbnb](https://npmjs.com/eslint-config-airbnb).

## Installation
```sh
yarn add --dev eslint-config-iinitz
```

## Usage
### JavaScript
Add `iinitz/js-base` to the "extends" array in your `.eslintrc` file.
```json
{
  "extends": ["iinitz/js-base"]
}
```
### JavaScript React
Add `iinitz/js-react` to the "extends" array in your `.eslintrc` file.
```json
{
  "extends": ["iinitz/js-react"]
}
```
### TypeScript
Add `iinitz/ts-base` to the "extends" array in your `.eslintrc` file.
```json
{
  "extends": ["iinitz/ts-base"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
}
```
### TypeScript React
Add `iinitz/ts-react` to the "extends" array in your `.eslintrc` file.
```json
{
  "extends": ["iinitz/ts-react"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
}
```
