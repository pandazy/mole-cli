import chalk from "chalk";
import { execSync } from 'child_process';
import askYesNo from "./ask-yes-no.js";
import { DevDeps, DevDepsNonGatsby } from "./dep-list.constant.js";
import { readDocker, writeDocker } from "./docker-cofig.js";
import removeYarnLock from "./remove-yarn-lock.js";

function justRunCommand(cmd, pandazyDev, initialScript = '') {
  const { FOLDER, NODE_MODULES_VOLUME_NAME, EX_PORT, IN_PORT } = pandazyDev;

  console.log(chalk.blue.bold(`Running command:`));
  console.log(chalk.blue.bold(`------------------`));
  console.log(chalk.blue.bold(cmd));
  console.log(chalk.blue.bold(`------------------`));

  execSync([
    'docker run --rm -it',
    `-v ${FOLDER}:/app`,
    `-v ${NODE_MODULES_VOLUME_NAME}:/app/node_modules`,
    `-v ~/.npmrc:/root/.npmrc`,
    `-p ${EX_PORT}:${IN_PORT}`,
    '-w /app node:buster',
    `sh -c "${initialScript ? `${initialScript} && ` : ''
    }${cmd}"`,
  ].join(' '), { stdio: 'inherit' });

  console.log(chalk.blue.bold(`------------------`));
  console.log(chalk.blue.bold(`Command finished`));
  console.log(chalk.blue.bold(`------------------`));
}

function handleError(err) {
  console.log(err);
  console.log(chalk.red.bold(`Error: ${err}`));
}

function runCommandWithContainerSettings(cmd, initialScript = '') {
  const dockerConf = readDocker();

  if (dockerConf) {
    justRunCommand(cmd, dockerConf, initialScript);
    return Promise.resolve();
  }

  return askYesNo('Container settings are missing. Do you want to initialize them now? (y/n) ')
    .then((isConfirmed) => {
      if (isConfirmed) {
        writeDocker();
        return justRunCommand(cmd, readDocker(), initialScript);
      }
      throw new Error('Container settings are missing.');
    })
    .catch(handleError);
}

export default function runCommand(cmd, isNew = false, isGatsby = false) {
  const deps = [
    ...DevDeps,
    ...isGatsby ? [] : DevDepsNonGatsby,
  ];
  const initialScript = `yarn add ${deps.join(' ')} --dev`;
  if (isNew) {
    removeYarnLock();
  }
  return runCommandWithContainerSettings(cmd, isNew ? initialScript : '');
}
