import chalk from 'chalk';
import { print } from './lib/print-helpers';
import { removeUserFile } from './lib/file-helpers';

export default function removeYarnLock(): void {
  removeUserFile({
    paths: ['yarn.lock'],
    afterRemoval: () => {
      print(chalk.blue('Removed yarn.lock'));
    },
  });
}
