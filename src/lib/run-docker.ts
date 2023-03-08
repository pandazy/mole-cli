import chalk from 'chalk';
import { execSync } from 'child_process';
import { getUserPath, getUserRepoName } from './file-helpers';
import { print } from './print-helpers';

export interface RunDockerOptions {
  shareNpmrc?: boolean;
  exPort: number;
  inPort: number;
}

export function runDocker(cmd: string, { shareNpmrc, exPort, inPort }: RunDockerOptions): void {
  print(chalk.blue.bold(`Running command in Docker:`));
  print(chalk.blue.bold(`------------------`));
  print(chalk.blue.bold(cmd));
  print(chalk.blue.bold(`------------------`));

  const userFolder = getUserPath('');
  const nodeModuleVolume = `${getUserRepoName()}_node_modules`;

  if (!cmd) {
    print(chalk.yellow.bold(`No command provided, docker did not run`));
    return;
  }

  execSync(
    [
      'docker run --rm -it',
      `-v ${userFolder}:/app`,
      `-v mole${nodeModuleVolume}:/app/node_modules`,
      shareNpmrc ? `-v ~/.npmrc:/root/.npmrc` : '',
      `-p ${exPort}:${inPort}`,
      '-w /app node:buster',
      `sh -c "${cmd}"`,
    ].join(' '),
    { stdio: 'inherit' }
  );
}
