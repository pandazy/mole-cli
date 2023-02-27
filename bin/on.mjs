#!/usr/bin/env node

import copyRootSettings from "../lib/copy-root-settings.js";
import updatePackageJSONSettings from "../lib/update-package-json-settings.js";
import yargs from 'yargs/yargs';
import chalk from "chalk";

const argv = yargs(process.argv.slice(2))
  .boolean('f')
  .alias('f', 'force')
  .describe('f', 'Force update settings even if moleOn is true or file already exists')
  .argv;

if (argv.f) {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));
}

copyRootSettings(argv.f);
updatePackageJSONSettings(argv.f);