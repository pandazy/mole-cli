#!/usr/bin/env node

import copyBoilerplateSettings from "./copy-boilerplate-settings.js";
import updatePackageJSONSettings from "./update-package-json-settings.js";
import chalk from "chalk";
import removeYarnLock from "./remove-yarn-lock.js";
import { writeDocker } from "./docker-cofig.js";

const TemplateMap = {
  'lib': 'new-lib-root',
  'fe': 'new-fe-root',
}

export default function initializeSettings(templateType) {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  copyBoilerplateSettings(TemplateMap[templateType]);
  removeYarnLock();
  updatePackageJSONSettings();
  writeDocker();
}