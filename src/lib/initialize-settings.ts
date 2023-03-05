
import chalk from 'chalk';
import copyBoilerplateSettings, { PackName } from './copy-boilerplate-settings';
import updatePackageJSONSettings from './update-package-json-settings';
import removeYarnLock from './remove-yarn-lock';
import { writeDocker } from './docker-config';

export type TemplateType = 'lib' | 'fe';

const TemplateMap: Record<TemplateType, PackName> = {
  'lib': 'new-lib-root',
  'fe': 'new-fe-root',
};

export default function initializeSettings(templateType: TemplateType): void {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  copyBoilerplateSettings('common');
  copyBoilerplateSettings(TemplateMap[templateType]);
  removeYarnLock();
  updatePackageJSONSettings();
  writeDocker();
}
