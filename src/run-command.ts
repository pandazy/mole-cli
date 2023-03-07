import chalk from 'chalk';
import { execSync } from 'child_process';
import { print } from './lib/print-helpers';
import askYesNo from './lib/ask-yes-no';
import { hasYarnLock } from './config-utils';
import { DevDepGatsby, DevDepsMole } from './dep-list-constant';
import { DockerConfig, readDocker, writeDocker } from './docker-config';
import hasMissingPackagesInVolume from './has-missing-packages-in-volume';
import removeYarnLock from './remove-yarn-lock';

function addNewDockerConfig(): DockerConfig {
  writeDocker();
  return readDocker() as DockerConfig;
}

function justRunCommand(cmd: string, pandazyDev: DockerConfig, initialScript = ''): void {
  const { FOLDER, NODE_MODULES_VOLUME_NAME, EX_PORT, IN_PORT } = pandazyDev;

  print(chalk.blue.bold(`Running command:`));
  print(chalk.blue.bold(`------------------`));
  print(chalk.blue.bold(cmd));
  print(chalk.blue.bold(`------------------`));

  execSync(
    [
      'docker run --rm -it',
      `-v ${FOLDER}:/app`,
      `-v ${NODE_MODULES_VOLUME_NAME}:/app/node_modules`,
      `-v ~/.npmrc:/root/.npmrc`,
      `-p ${EX_PORT}:${IN_PORT}`,
      '-w /app node:buster',
      `sh -c "${initialScript ? `${initialScript} && ` : ''}${cmd}"`,
    ].join(' '),
    { stdio: 'inherit' }
  );

  print(chalk.blue.bold(`------------------`));
  print(chalk.blue.bold(`Command finished`));
  print(chalk.blue.bold(`------------------`));
}

function runCommandWithContainerSettings(cmd: string, initialScript = ''): void {
  const dockerConf = readDocker();
  const checkedConfig = dockerConf || addNewDockerConfig();
  justRunCommand(cmd, checkedConfig, initialScript);
}

export type RunOptionKey = 'isNew' | 'isGatsby' | 'skipPackageCheck';

interface RunCommandOptions {
  isNew?: boolean;
  isGatsby?: boolean;
  skipPackageCheck?: boolean;
}

export default function runCommand(cmd: string, options: RunCommandOptions = {}): Promise<void> {
  const { isNew, isGatsby, skipPackageCheck } = options;
  const deps = isGatsby ? DevDepGatsby : DevDepsMole;
  const foundYarnLock = hasYarnLock();
  const addPackScript = `yarn --dev add ${deps.join(' ')}`;
  const runAsUsual: () => Promise<void> = () =>
    Promise.resolve().then(() => runCommandWithContainerSettings(cmd, isNew ? addPackScript : ''));
  if (skipPackageCheck) {
    print(chalk.yellow.bold('Skipping node-module integrity check...'));
  }
  if (!isNew && !skipPackageCheck && (!foundYarnLock || hasMissingPackagesInVolume(isGatsby))) {
    return askYesNo(
      'Node modules are not properly installed. Do you want to install them now? (Y/n) '
    ).then((isConfirmed) => {
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
