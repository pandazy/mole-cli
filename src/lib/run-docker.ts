import chalk from 'chalk';
import {
  print,
  RunDockerOptions,
  runDocker as runDockerCore,
} from '@pandazy/mole-core/dist/nodejs';

export { RunDockerOptions };

export function runDocker(cmd: string, options: RunDockerOptions): void {
  print(chalk.blue.bold(`Running command in Docker:`));
  print(chalk.blue.bold(`------------------`));
  print(chalk.blue.bold(cmd));
  print(chalk.blue.bold(`------------------`));

  runDockerCore(cmd, options);
}
