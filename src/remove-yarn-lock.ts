import chalk from 'chalk';
import { removeUserFile } from './lib/file-helpers';

export default function removeYarnLock(): void {
  removeUserFile({
    paths: ['yarn.lock'],
    afterRemoval: () => {
      console.log(chalk.blue('Removed yarn.lock'));
    },
  });
}
