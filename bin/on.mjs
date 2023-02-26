#!/usr/bin/env node

import copyRootSettings from "../lib/copy-root-settings.js";
import updatePackageJSONSettings from "../lib/update-package-json-settings.js";

copyRootSettings();
updatePackageJSONSettings();