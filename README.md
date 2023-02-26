# mole-cli

## Prerequisite:

-   [Docker](https://www.docker.com/)
-   [Yarn](https://yarnpkg.com/)

## Installation:

```
yarn global add @pandazy/mole-cli
```

## Usage

```
mole <package.json's script name>
```

It will set up TypeScript project with shared configuration from

-   [mole-config](https://github.com/pandazy/mole-config)
-   [eslint-config-mole](https://github.com/pandazy/eslint-config-mole)

And run `yarn install && yarn <package.json's script name>` under the hood

from a Docker container installed with Node.js and Yarn.
