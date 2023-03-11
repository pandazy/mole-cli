import chalk from 'chalk';
import { print } from '@pandazy/mole-core/dist/nodejs';
import copyHusky from './copy-husky';
import { readInit, writeInit } from './init-config';
import { writeHandsoff } from './handsoff-config';
import { ProjectType } from './project-helpers';
import copyCommonConfig from './copy-common-config';
import copyBoilerplateSettings from './copy-boilerplate-settings';
import updatePackageJSONSettings from './update-package-json-settings';
import removeYarnLock from './remove-yarn-lock';
import { writeDocker } from './docker-config';

function syncSavedProjectType(inputProjectType?: ProjectType): ProjectType {
  const { projectType: savedProjectType } = readInit() ?? {};

  if (!savedProjectType && !inputProjectType) {
    throw new Error('No project type provided and no previous settings found.');
  }
  if (savedProjectType && inputProjectType && savedProjectType !== inputProjectType) {
    throw new Error(
      'Project type does not match previous settings, or projectType should not be provided.'
    );
  }
  if (!savedProjectType && inputProjectType) {
    writeInit({ projectType: inputProjectType });
    return inputProjectType;
  }
  return savedProjectType as ProjectType;
}

interface InitOptions {
  projectType?: ProjectType;
  projectName?: string;
}

export default function initializeSettings({ projectType, projectName }: InitOptions = {}): void {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  const syncedProjectType = syncSavedProjectType(projectType);
  print(chalk.gray(`Project type:${syncedProjectType}`));
  copyCommonConfig();
  copyBoilerplateSettings('common');
  copyBoilerplateSettings(syncedProjectType);
  removeYarnLock();
  updatePackageJSONSettings(syncedProjectType, projectName);
  writeHandsoff();
  writeDocker();
  copyHusky();
}
