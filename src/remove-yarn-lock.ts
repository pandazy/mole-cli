import chalk from 'chalk';
import { print , removeUserFile } from '@pandazy/mole-core/dist/nodejs';

export default function removeYarnLock(): void {
  removeUserFile({
    paths: ['yarn.lock'],
    afterRemoval: () => {
      print(chalk.blue('Removed yarn.lock'));
    },
  });
}
