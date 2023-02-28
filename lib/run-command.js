import chalk from "chalk";
import { execSync } from 'child_process';
import { readPandazyDev } from "./pandazy-dev.js";

export default function runCommand(cmd, runYarnInstall = false) {
  const pandazyDev = readPandazyDev();

  if (!pandazyDev) {
    throw new Error('No .pandazy-dev settings found');
  }

  const { FOLDER, NODE_MODULES_VOLUME_NAME, EX_PORT, IN_PORT } = pandazyDev;

  console.log(chalk.blue.bold(`Running command:`));
  console.log(chalk.blue.bold(`------------------`));
  console.log(chalk.blue.bold(cmd));
  console.log(chalk.blue.bold(`------------------`));

  execSync('docker pull node:alpine', { stdio: 'inherit' });
  const yarnInstallCmd = runYarnInstall ? 'yarn install && ' : '';
  execSync([
    'docker run --rm -it',
    `-v ${FOLDER}:/app`,
    `-v ${NODE_MODULES_VOLUME_NAME}:/app/node_modules`,
    `-v ~/.npmrc:/app/.npmrc`,
    `-p ${EX_PORT}:${IN_PORT}`,
    '-w /app node:alpine',
    `sh -c "${yarnInstallCmd}${cmd}"`,
  ].join(' '), { stdio: 'inherit' });

  console.log(chalk.blue.bold(`------------------`));
  console.log(chalk.blue.bold(`Command finished`));
  console.log(chalk.blue.bold(`------------------`));
}
