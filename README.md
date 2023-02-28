# mole-cli

## Prerequisite:
- Update `~/.npmrc`, add the following code
    ```
    @pandazy:registry=https://npm.pkg.github.com
    ```
    if it doesn't exist
-   [Docker](https://www.docker.com/)
-   [Yarn](https://yarnpkg.com/)

## Installation:

```
yarn global add @pandazy/mole-cli
```

## Usage

```
Usage: mole [-y][-n] -c <command>

Options:
  -n, --new           If specified, it will initialize development settings,
                      including TypeScript, Jest, ESLint, etc.
  -y, --yarn-install  If specified, it will run "yarn install" before running
                      the command.
  -c, --command       Command to run                         [string] [required]
  -h, --help          Show help                                        [boolean]
  -v, --version       Show version number                              [boolean]

Examples:
  mole -c "yarn test"        Run "yarn test"
  mole -c -n "yarn test"     Initialize the settings and run "yarn test"
  mole -y -c -n "yarn test"  Initialize the settings, run "yarn install" and run
                             "yarn test"
```

### Example
```
mole -c "yarn test" -n

// as long as there is "./src/*.spec.ts" in the project
```

It will set up TypeScript project with shared configuration from

-   [mole-config](https://github.com/pandazy/mole-config)
-   [eslint-config-mole](https://github.com/pandazy/eslint-config-mole)

And run the project by `yarn install && <command>` (in the case above, "_yarn install && yarn test_") under the hood
from a Docker container instantiated from a node:alpine image.

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
![image](https://user-images.githubusercontent.com/519653/221909241-e4395227-1968-482d-b0c3-a5e9db9ae5b8.png)

### Run the command `mole -c "yarn test" -n`

![image](https://user-images.githubusercontent.com/519653/221444544-fa846932-d4d6-4e81-9de9-af19fe3b1a51.png)

![image](https://user-images.githubusercontent.com/519653/221444588-b613b965-cb40-4db3-a2b9-fe9c708e1cf2.png)

### Now the repository is like this
![image](https://user-images.githubusercontent.com/519653/221444754-f5fda96e-9eb3-41a5-b2eb-8446d17d8314.png)

### It runs in a Docker container
![image](https://user-images.githubusercontent.com/519653/221444940-14a2812d-64f9-406f-811b-92b1286becdb.png)

### node_modules is stored in a Docker volume (not in the project repository, otherwise it hurts the performance)
![image](https://user-images.githubusercontent.com/519653/221444892-924f4a14-f687-489e-a42a-e1f433478224.png)









