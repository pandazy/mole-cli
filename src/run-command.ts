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
}

export default async function runCommand(cmd: string, options: RunCommandOptions): Promise<void> {
  const { isNew, projectType, skipPackageCheck } = options;
  const foundYarnLock = hasYarnLock();
  const addPackScript = `git init -q && yarn --dev add ${DevDepsMole.join(' ')}`;
  const cmdSuffix = cmd ? `&& ${cmd}` : '';
  const runAll = `${addPackScript} ${cmdSuffix}`;

  if (isNew) {
    removeYarnLock();
    runDockerWithPandazyConfig(runAll);
    return Promise.resolve();
  }

  if (skipPackageCheck || (foundYarnLock && !hasMissingPackagesInVolume(projectType))) {
    runDockerWithPandazyConfig(cmd);
    return Promise.resolve();
  }

  const isConfirmed = await askYesNo(
    'Node modules are not properly installed. Do you want to install them now? (Y/n) '
  );
  if (isConfirmed) {
    removeYarnLock();
    runDockerWithPandazyConfig(runAll);
    return Promise.resolve();
  }

  runDockerWithPandazyConfig(cmd);
  return Promise.resolve();
}
