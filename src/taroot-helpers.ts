#!/usr/bin/env node

import { tar, untar } from './lib/tar-helpers';
import { getProviderPath } from './lib/files';

const ProviderPath = getProviderPath('dist', 'taroot.tar.gz');

const ToProvide = [
  '.gitignore',
  '.npmignore',
  '.eslintrc.js',
  '.eslintignore',
  '.prettierrc',
  'commitlint.config.js',
  'jest.config.ts',
  'tsconfig.json',
  'tsconfig.build.json',
  '.husky',
].join(' ');

export function tarRoot(): void {
  tar(ProviderPath, ToProvide);
}

export function untarRoot(): void {
  untar(ProviderPath);
}
