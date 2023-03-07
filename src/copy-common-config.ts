import chalk from 'chalk';
import fs from 'fs';
import { print } from './lib/print-helpers';
import { getLibPath, getUserPath } from './lib/file-helpers';

const CommonFiles = [
  'tsconfig.json',
  'tsconfig.build.json',
  'jest.config.ts',
  '.eslintrc.js',
  '.eslintignore',
  '.prettierrc',
];

export default function copyCommonConfig(): void {
  CommonFiles.forEach((file) => {
    const srcPath = getLibPath(`../../${file}`);
    const destPath = getUserPath(`./${file}`);
    fs.copyFileSync(srcPath, destPath);
  });
  print(chalk.blue('Copied common config files (eslint, tsconfig, prettier, jest, etc.)'));
}
