# mole-cli

## Prerequisite:

-   [Docker](https://www.docker.com/)
-   [Yarn](https://yarnpkg.com/)

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
npx @pandazy/mole-cli -c "yarn test" -n

// as long as there is "./src/*.spec.ts" in the project
```

It will set up TypeScript project with shared configuration from

-   [mole-config](https://github.com/pandazy/mole-config)
-   [eslint-config-mole](https://github.com/pandazy/eslint-config-mole)

And run the project by `yarn install && <command>` (in the case above, "_yarn install && yarn test_") under the hood
from a Docker container instantiated from a node:alpine image.

---

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

### Run the command `npx @pandazy/mole-cli -c "yarn test" -n`

![image](https://user-images.githubusercontent.com/519653/221911842-0b14e64d-0833-4ef9-9bd6-9d0d5fab8a03.png)

![image](https://user-images.githubusercontent.com/519653/221444588-b613b965-cb40-4db3-a2b9-fe9c708e1cf2.png)

### Now the repository is like this

![image](https://user-images.githubusercontent.com/519653/221912103-952ff392-a8ec-4c53-a1ce-2844eb50530b.png)

### It runs in a Docker container

![image](https://user-images.githubusercontent.com/519653/221912714-22fe438c-c7f1-437f-be0e-7d21ac5d7cf1.png)

### node_modules is stored in a Docker volume (not in the project repository, otherwise it hurts the performance)

![image](https://user-images.githubusercontent.com/519653/221912221-08915c56-9292-4507-8488-60ff251c4417.png)
