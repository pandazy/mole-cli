import fs from 'fs';
import chalk from 'chalk';
import scripts from './scripts.json' assert { type: "json" };
import clearLastLineAndPrint from './print-helpers.js';

function updateNPMRegistry(packageJSON) {
  if (!packageJSON.publishConfig) {
    packageJSON.publishConfig = {};
  }
  packageJSON.publishConfig.registry = 'https://npm.pkg.github.com';
  return packageJSON;
}

function updateJestSettings(packageJSON) {
  if (!packageJSON.jest) {
    packageJSON.jest = {};
  }
  packageJSON.jest.preset = '@pandazy/mole-config';

  return packageJSON;
}

function updateYarnCommands(packageJSON) {
  if (!packageJSON.scripts) {
    packageJSON.scripts = {};
  }
  Object.entries(scripts).forEach(([key, value]) => {
    packageJSON.scripts[key] = value;
  });
  return packageJSON;
}

export default function updatePackageJSONSettings() {
  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const newPackageJSON1 = updateJestSettings(packageJSON);
  const newPackageJSON2 = updateYarnCommands(newPackageJSON1);
  const newPackageJSON3 = updateNPMRegistry(newPackageJSON2);
  fs.writeFileSync('./package.json', `${JSON.stringify(newPackageJSON3, null, 2)}\n`);
  clearLastLineAndPrint(
    chalk.green.bold('package.json settings updated.')
  );
}
