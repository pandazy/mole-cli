import { execSync } from 'child_process';
import { ProjectType } from './project-helpers';
import { runDockerWithPandazyConfig } from './docker-config';
import askYesNo from './lib/ask-yes-no';
import { hasYarnLock } from './config-utils';
import { DevDepsMole } from './dep-list-constant';
import hasMissingPackagesInVolume from './has-missing-packages-in-volume';
import removeYarnLock from './remove-yarn-lock';

interface RunCommandOptions {
  isNew?: boolean;
  projectType: ProjectType;
  skipPackageCheck?: boolean;
  noDocker?: boolean;
}

function runPureCommand(cmd: string): void {
  execSync(cmd, { stdio: 'inherit' });
}

function makeRun(noDocker?: boolean): (cmd: string) => void {
  return (cmd: string): void => {
    if (noDocker) {
      runPureCommand(cmd);
      return;
    }

    runDockerWithPandazyConfig(cmd);
  };
}

export default async function runCommand(cmd: string, options: RunCommandOptions): Promise<void> {
  console.warn('nodocker?', options.noDocker);
  const { isNew, projectType, skipPackageCheck, noDocker } = options;
  const foundYarnLock = hasYarnLock();
  const addPackScript = `git init -q && yarn --dev add ${DevDepsMole.join(' ')}`;
  const cmdSuffix = cmd ? `&& ${cmd}` : '';
  const runAll = `${addPackScript} ${cmdSuffix}`;

  const run = makeRun(noDocker);

  if (isNew) {
    removeYarnLock();
    run(runAll);
    return Promise.resolve();
  }

  if (skipPackageCheck || (foundYarnLock && !hasMissingPackagesInVolume(projectType))) {
    run(cmd);
    return Promise.resolve();
  }

  const isConfirmed = await askYesNo(
    'Node modules are not properly installed. Do you want to install them now? (Y/n) '
  );
  if (isConfirmed) {
    removeYarnLock();
    run(runAll);
    return Promise.resolve();
  }

  run(cmd);
  return Promise.resolve();
}
