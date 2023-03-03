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
  .option('bt', {
    type: 'string',
    default: 'lib',
    describe: 'The boilerplate type to use',
    alias: 'boilerplateType',
    choices: ['lib', 'fe'],
  })
  .option('spc', {
    type: 'boolean',
    default: false,
    describe: 'If specified, it will skip the check for missing node modules',
    alias: 'skipPackageCheck',
  })
  .option('h', {
    default: false,
    alias: 'help',
  })
  .version(getVersion())
  .usage(`Usage: ${starterCmd} [-y][-n] -c <command>`)
  .example(`${starterCmd} -c "yarn test"', 'Run "yarn test"`)
  .example(`${starterCmd} -n -c "yarn test"`, 'Initialize the settings and run "yarn test"')
  .strict()
  .argv;

if (argv.n) {
  initializeSettings(argv.bt);
}

runCommand(argv.c, {
  isNew: argv.n,
  skipPackageCheck: argv.skipPackageCheck,
});
