import chalk from 'chalk';
import { writeReserved } from './reserved-config';
import { ProjectType } from './project-helpers';
import copyCommonConfig from './copy-common-config';
import copyBoilerplateSettings from './copy-boilerplate-settings';
import updatePackageJSONSettings from './update-package-json-settings';
import removeYarnLock from './remove-yarn-lock';
import { writeDocker } from './docker-config';

export default function initializeSettings(projectType: ProjectType): void {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  copyCommonConfig();
  copyBoilerplateSettings('common');
  copyBoilerplateSettings(projectType);
  removeYarnLock();
  updatePackageJSONSettings(projectType);
  writeReserved();
  writeDocker();
}
