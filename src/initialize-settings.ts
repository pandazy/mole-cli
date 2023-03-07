import chalk from 'chalk';
import copyCommonConfig from './copy-common-config';
import copyBoilerplateSettings, { PackName } from './copy-boilerplate-settings';
import updatePackageJSONSettings from './update-package-json-settings';
import removeYarnLock from './remove-yarn-lock';
import { writeDocker } from './docker-config';

export type Boilerplate = Exclude<PackName, 'common'>;

export default function initializeSettings(boilerplate: Boilerplate): void {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  copyCommonConfig();
  copyBoilerplateSettings('common');
  copyBoilerplateSettings(boilerplate);
  removeYarnLock();
  updatePackageJSONSettings();
  writeDocker();
}
