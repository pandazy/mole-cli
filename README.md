# mole-cli

## Prerequisite:
- Update `~/.npmrc`, add the following code
```
@pandazy:registry=https://npm.pkg.github.com
```
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

### Example
```
mole test

// as long as there is "./src/*.spec.ts" in the project
```

It will set up TypeScript project with shared configuration from

-   [mole-config](https://github.com/pandazy/mole-config)
-   [eslint-config-mole](https://github.com/pandazy/eslint-config-mole)

And run the project by `yarn install && yarn <package.json's script name>` (in the case above, "_yarn install && yarn test_") under the hood
from a Docker container installed with Node.js and Yarn.

The docker container uses [this image](https://hub.docker.com/layers/jszhengyq/dermis/latest/images/sha256:dea2da756e951741f919069e16145ce806f5ab1107ed66d4f8084fd2f60a28b8)

-------------------

## Demo:
### Before running the command:

![image](https://user-images.githubusercontent.com/519653/221444157-5d1f0966-92a8-41b4-8f1b-3c74fcf3246f.png)

What package.json looks like
```
{
  "name": "mole-config-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "author": "",
  "license": "ISC"
}
```

### Install mole-cli
![image](https://user-images.githubusercontent.com/519653/221444255-9ff79b80-ad09-4b6c-a4e2-1b924a94722f.png)

### Run the command `mole test`

![image](https://user-images.githubusercontent.com/519653/221444544-fa846932-d4d6-4e81-9de9-af19fe3b1a51.png)

![image](https://user-images.githubusercontent.com/519653/221444588-b613b965-cb40-4db3-a2b9-fe9c708e1cf2.png)

### Now the repository is like this
![image](https://user-images.githubusercontent.com/519653/221444754-f5fda96e-9eb3-41a5-b2eb-8446d17d8314.png)

### It runs in a Docker container
![image](https://user-images.githubusercontent.com/519653/221444940-14a2812d-64f9-406f-811b-92b1286becdb.png)

### node_modules is stored in a Docker volume (not in the project repository, otherwise it hurts the performance)
![image](https://user-images.githubusercontent.com/519653/221444892-924f4a14-f687-489e-a42a-e1f433478224.png)









