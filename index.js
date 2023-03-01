#!/usr/bin/env node

import yargs from 'yargs/yargs';
import runCommand from './lib/run-command.js';
import initializeSettings from './lib/initialize-settings.js';
import packageJSON from './package.json' assert { type: 'json' };

const args = process.argv.slice(2);

const argv = yargs(args)
  .alias('n', 'new')
  .describe('n', 'If specified, it will initialize development settings, including TypeScript, Jest, ESLint, etc., install dependencies, and run the command')
  .alias('c', 'command')
  .string('c')
  .demandOption('c')
  .describe('c', 'Command to run')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .version(packageJSON.version)
  .usage('Usage: mole [-y][-n] -c <command>')
  .example('npx @pandazy/mole-cli -c "yarn test"', 'Run "yarn test"')
  .example('npx @pandazy/mole-cli -c -n "yarn test"', 'Initialize the settings and run "yarn test"')
  .argv;

if (argv.n) {
  initializeSettings();
}

runCommand(argv.c, argv.n);