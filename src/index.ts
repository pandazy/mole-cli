#!/usr/bin/env node

import yargs from 'yargs/yargs';
import chalk from 'chalk';
import { getProcess, print } from '@pandazy/mole-core/dist/nodejs';
import { readInit } from './init-config';
import { ProjectType } from './project-helpers';
import buildStarterKit from './build-starter-kit';
import runCommand from './run-command';
import initializeSettings from './initialize-settings';
import getVersion from './get-version';

type MoleMode = 'new' | 'run' | 'update';

const Argv = getProcess().argv;

const mode = Argv.slice(2)[0] as MoleMode;

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

const getDefaultOptions = (): ConvertedArgv => ({
  realArgs: Argv.slice(2),
});

const { command, noCommandMsg, realArgs } = (ArgvGenMap[mode] ?? getDefaultOptions)();
if (noCommandMsg && !command) {
  print(chalk.red.bold(noCommandMsg));
  getProcess().exit(1);
}

const starterCmd = 'mole';
const idxYargs = yargs(realArgs)
  .option('pt', {
    type: 'string',
    describe:
      '[Only for "new"] The project type, e.g. a utility library, Web UI, or backend server',
    alias: 'projectType',
    choices: ['lib', 'webui', 'srv'] as ProjectType[],
  })
  .option('n', {
    hidden: true,
    type: 'string',
    describe: '[internal] the project name, reserved for initializing a new project',
    alias: 'name',
  })
  .option('spc', {
    type: 'boolean',
    default: false,
    describe: '[Only for "run"] If specified, it will skip the check for missing node modules',
    alias: 'skipPackageCheck',
  })
  .option('h', {
    default: false,
    alias: 'help',
  })
  .version(getVersion())
  .usage(
    `Usage:
     ${starterCmd} new <project> [--pt=lib|webui|srv]
     ${starterCmd} run <command> [-spc]
     ${starterCmd} update`
  )
  .example(`${starterCmd} run "yarn test"`, 'Run "yarn test"')
  .example(
    `${starterCmd} new "my-project" --pt webui`,
    'Initialize the settings and run "yarn test"'
  )
  .strict();

const { argv } = idxYargs;

if (!mode || !(mode in ArgvGenMap)) {
  idxYargs.showHelp();
  getProcess().exit(1);
}

const tArgv = argv as unknown as {
  pt: ProjectType;
  skipPackageCheck?: boolean;
  n?: string;
};

const internalUseChecklist: [string, MoleMode | '', () => boolean][] = [
  ['pt', 'update', (): boolean => !!tArgv.pt],
  ['n', '', (): boolean => !!tArgv.n],
];

internalUseChecklist.forEach(([option, triggerMode, canConfirm]) => {
  if ((triggerMode === '' || mode === triggerMode) && canConfirm()) {
    print(
      chalk.yellow(
        `-${option} is an internal option for '${mode}',
        make sure you know what you are doing.`
      )
    );
  }
});

const RunMap: Record<MoleMode, () => void> = {
  new: () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    buildStarterKit(command as string, tArgv.pt ?? 'lib');
  },
  run: () => {
    const projectType = readInit()?.projectType;
    if (!projectType) {
      throw new Error(
        'Project type is not specified, please run `mole update --pt <projectType>` first'
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runCommand(command as string, {
      skipPackageCheck: tArgv.skipPackageCheck,
      projectType,
    });
  },
  update: () => {
    initializeSettings({
      projectType: tArgv.pt,
      projectName: tArgv.n,
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    runCommand('', {
      isNew: true,
      projectType: tArgv.pt,
    });
  },
};

RunMap[mode]();
