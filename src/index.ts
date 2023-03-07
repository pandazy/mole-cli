#!/usr/bin/env node

import yargs from 'yargs/yargs';
import runCommand from './run-command';
import initializeSettings, { Boilerplate } from './initialize-settings';
import getVersion from './get-version';

const args = process.argv.slice(2);

const starterCmd = 'mole';
const { argv } = yargs(args)
  .option('c', {
    type: 'string',
    describe: 'The command to run',
    alias: 'cmd',
    demandOption: true,
  })
  .option('n', {
    type: 'boolean',
    default: false,
    describe:
      'If specified, it will initialize development settings, \n' +
      'including TypeScript, Jest, ESLint, etc., \n' +
      'install dependencies, ' +
      ' and run the command',
    alias: 'new',
  })
  .option('bt', {
    type: 'string',
    default: 'lib',
    describe: 'The boilerplate type to use',
    alias: 'boilerplateType',
    choices: ['lib', 'fe', 'srv'],
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
  .example(`${starterCmd} -c "yarn test"`, 'Run "yarn test"')
  .example(`${starterCmd} -n -c "yarn test"`, 'Initialize the settings and run "yarn test"')
  .strict();

const tArgv = argv as unknown as {
  c: string;
  n: boolean;
  bt: Boilerplate;
  skipPackageCheck: boolean;
};

if (tArgv.n) {
  initializeSettings(tArgv.bt);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
runCommand(tArgv.c, {
  isNew: tArgv.n,
  skipPackageCheck: tArgv.skipPackageCheck,
});
