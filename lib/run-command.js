import chalk from "chalk";
import { execSync } from 'child_process';
import askYesNo from "./ask-yes-no.js";
import { hasYarnLock } from "./config-utils.js";
import { DevDeps, DevDepsNonGatsby } from "./dep-list.constant.js";
import { readDocker, writeDocker } from "./docker-cofig.js";
import hasMissingPackagesInVolume from "./has-missing-packages-in-volume.js";
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

export default function runCommand(cmd, options = {}) {
  const { isNew, isGatsby, skipPackageCheck } = options;
  const deps = [
    ...DevDeps,
    ...isGatsby ? [] : DevDepsNonGatsby,
  ];
  const foundYarnLock = hasYarnLock();
  const addPackScript = `yarn add ${deps.join(' ')} --dev`;
  const runAsUsual = () => runCommandWithContainerSettings(cmd, isNew ? addPackScript : '')
  if (skipPackageCheck) {
    console.log(chalk.yellow.bold('Skipping node-module integrity check...'));
  }
  if (
    !isNew &&
    !skipPackageCheck && (
      !foundYarnLock || hasMissingPackagesInVolume(isGatsby)
    )) {
    return askYesNo('Node modules are not properly installed. Do you want to install them now? (y/n) ')
      .then((isConfirmed) => {
        if (isConfirmed) {
          removeYarnLock();
          return runCommandWithContainerSettings(cmd, addPackScript);
        }
        return runAsUsual();
      });
  }

  if (isNew) {
    removeYarnLock();
  }
  return runAsUsual();
}
