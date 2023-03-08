#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';
import assertMoleCliOnly from './assert-mole-cli-only';
import { getUserPath } from './lib/file-helpers';

assertMoleCliOnly();

const distFolder = getUserPath('dist');

const reservedEntries = Object.freeze(new Set(['index.js']));

let executableCount = 0;
fs.readdirSync(distFolder).forEach((file) => {
  if ((!reservedEntries.has(file) && !file.endsWith('.run.js')) || file === 'chmodx.run.js') {
    return;
  }
  const executablePath = `${distFolder}/${file}`;
  execSync(`chmod +x ${executablePath}`, { stdio: 'inherit' });
  console.log(chalk.green(`Executable file created: ${executablePath}`));
  executableCount += 1;
});

if (executableCount <= 0) {
  console.warn(chalk.yellow('No executable file found in dist folder'));
}
