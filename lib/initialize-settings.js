#!/usr/bin/env node

import copyRootSettings from "./copy-root-settings.js";
import updatePackageJSONSettings from "./update-package-json-settings.js";
import chalk from "chalk";
import removeYarnLock from "./remove-yarn-lock.js";
import { writeDocker } from "./docker-cofig.js";

export default function initializeSettings() {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  copyRootSettings();
  removeYarnLock();
  updatePackageJSONSettings();
  writeDocker();
}