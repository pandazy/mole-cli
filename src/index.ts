#!/usr/bin/env node

import yargs from 'yargs/yargs';
import chalk from 'chalk';
import { ProjectType } from 'project-helpers';
import runCommand from './run-command';
import initializeSettings from './initialize-settings';
import getVersion from './get-version';
import { print } from './lib/print-helpers';

type MoleMode = 'new' | 'run' | 'update';

const Argv = process.argv;

const mode = Argv.slice(2)[0] as MoleMode;

if (!mode) {
  print('Please specify the mode: new, run, or update');
  print('mole new <project>: create a new project');
  print('mole run <command>: run a command');
  print(
    'mole update: update the project, including dependencies, eslint, jest.config, tsconfig, etc.'
  );
  process.exit(1);
}

const FirstArg = Argv.slice(3)[0];

interface ConvertedArgv {
  command?: string;
  realArgs: string[];
  noCommandMsg?: string;
}

const ArgvGenMap = {
  new: (): ConvertedArgv => ({
    command: FirstArg,
    realArgs: Argv.slice(4),
    noCommandMsg: 'Please specify the project name',
  }),
  run: (): ConvertedArgv => ({
    command: FirstArg,
    realArgs: Argv.slice(4),
    noCommandMsg: 'Please specify the command',
  }),
  update: (): ConvertedArgv => ({
    realArgs: Argv.slice(3),
  }),
};

const { command, noCommandMsg, realArgs } = ArgvGenMap[mode]();
if (noCommandMsg && !command) {
  print(chalk.red.bold(noCommandMsg));
  process.exit(1);
}

const starterCmd = 'mole';
const { argv } = yargs(realArgs)
  .option('pt', {
    type: 'string',
    default: 'lib',
    describe: 'The project type, e.g. a utility library, Web UI, or backend server',
    alias: 'projectType',
    choices: ['lib', 'webui', 'srv'] as ProjectType[],
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
  .example(`${starterCmd} run "yarn test"`, 'Run "yarn test"')
  .example(`${starterCmd} new --bt fe`, 'Initialize the settings and run "yarn test"')
  .strict();

const tArgv = argv as unknown as {
  pt: ProjectType;
  skipPackageCheck: boolean;
};

const RunMap: Record<MoleMode, () => void> = {
  new: () => {
    print(`todo: build new project ${command as string}`);
  },
  run: () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runCommand(command as string, {
      skipPackageCheck: tArgv.skipPackageCheck,
      projectType: tArgv.pt,
    });
  },
  update: () => {
    initializeSettings(tArgv.pt);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runCommand('', {
      isNew: true,
      projectType: tArgv.pt,
    });
  },
};

RunMap[mode]();
