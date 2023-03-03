#!/usr/bin/env node

import yargs from 'yargs/yargs';
import runCommand from './lib/run-command.js';
import initializeSettings from './lib/initialize-settings.js';
import getVersion from './lib/get-version.js';

const args = process.argv.slice(2);

const starterCmd = 'mole';
const argv = yargs(args)
  .option('c', {
    type: 'string',
    describe: 'The command to run',
    alias: 'cmd',
    demandOption: true,
  })
  .option('n', {
    type: 'boolean',
    default: false,
    describe: 'If specified, it will initialize development settings, \n'
      + 'including TypeScript, Jest, ESLint, etc., ' + 'install dependencies, ' +
      ' and run the command',
    alias: 'new'
  })
  .option('h', {
    default: false,
    alias: 'help',
  })
  .option('v', {
    type: 'boolean',
    default: false,
  })
  .version(getVersion())
  .usage(`Usage: ${starterCmd} [-y][-n] -c <command>`)
  .example(`${starterCmd} -c "yarn test"', 'Run "yarn test"`)
  .example(`${starterCmd} -n -c "yarn test"`, 'Initialize the settings and run "yarn test"')
  .strict()
  .argv;

if (argv.n) {
  initializeSettings();
}

runCommand(argv.c, argv.n);
