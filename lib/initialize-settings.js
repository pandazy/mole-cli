#!/usr/bin/env node

import copyRootSettings from "./copy-root-settings.js";
import updatePackageJSONSettings from "./update-package-json-settings.js";
import chalk from "chalk";
import { writePandazyDev } from "./pandazy-dev.js";

export default function initializeSettings() {
  console.warn(chalk.yellow.bold('WARNING: Previous settings will be overwritten.'));

  copyRootSettings(true);
  updatePackageJSONSettings(true);
  writePandazyDev();
}