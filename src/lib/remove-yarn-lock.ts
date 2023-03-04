import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const UserYarnLockPath = path.resolve(process.cwd(), 'yarn.lock');

export default function removeYarnLock(): void {
  if (fs.existsSync(UserYarnLockPath)) {
    fs.unlinkSync(UserYarnLockPath);
    console.log(chalk.blue('Removed yarn.lock'));
  }
}
