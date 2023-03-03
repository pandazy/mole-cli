import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default function removeYarnLock() {
  const yarnLockPath = path.resolve(process.cwd(), 'yarn.lock');
  if (fs.existsSync(yarnLockPath)) {
    fs.unlinkSync(yarnLockPath);
    console.log(chalk.blue('Removed yarn.lock'));
  }
}
