import chalk from 'chalk';
import fs from 'fs';
import { print , getUserPath } from '@pandazy/mole-core/dist/nodejs';
import { getProviderPath } from './lib/files';

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
    const srcPath = getProviderPath(file);
    const destPath = getUserPath(file);
    fs.copyFileSync(srcPath, destPath);
  });
  print(chalk.blue('Copied common config files (eslint, tsconfig, prettier, jest, etc.)'));
}
