import chalk from 'chalk';
import { print } from '@pandazy/mole-core/dist/nodejs/prints';
import { removeUserFile } from '@pandazy/mole-core/dist/nodejs/files';

export default function removeYarnLock(): void {
  removeUserFile({
    paths: ['yarn.lock'],
    afterRemoval: () => {
      print(chalk.blue('Removed yarn.lock'));
    },
  });
}
