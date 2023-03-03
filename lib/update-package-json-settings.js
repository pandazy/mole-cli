import fs from 'fs';
import chalk from 'chalk';
import scripts from './scripts.json' assert { type: "json" };
import { DevDeps, DevDepsNonGatsby } from './dep-list.constant.js';

function updateNPMRegistry(packageJSON) {
  console.log(chalk.blue('Updating NPM registry to Github..'));
  if (!packageJSON.publishConfig) {
    packageJSON.publishConfig = {};
  }
  packageJSON.publishConfig.registry = 'https://npm.pkg.github.com';
  return packageJSON;
}

function updateJestSettings(packageJSON) {
  console.log(chalk.blue('Updating Jest settings..'));
  if (!packageJSON.jest) {
    packageJSON.jest = {};
  }
  packageJSON.jest.preset = '@pandazy/mole-config';

  return packageJSON;
}

function updateYarnCommands(packageJSON) {
  console.log(chalk.blue('Updating Yarn commands..'));
  if (!packageJSON.scripts) {
    packageJSON.scripts = {};
  }
  Object.entries(scripts).forEach(([key, value]) => {
    packageJSON.scripts[key] = value;
  });
  return packageJSON;
}

const DepNames = [
  ...DevDeps,
  ...DevDepsNonGatsby
];

function reduceDep(acc, [key, value]) {
  if (DepNames.includes(key)) {
    return acc;
  }
  return {
    ...acc,
    [key]: value
  };
}

function updateDeps(packageJSON) {
  const { dependencies, devDependencies } = packageJSON;

  return {
    ...packageJSON,
    dependencies: Object.entries({
      ...dependencies || {}
    }).reduce(reduceDep, {}),
    devDependencies: Object.entries({
      ...devDependencies || {}
    }).reduce(reduceDep, {})
  };
}

export default function updatePackageJSONSettings() {
  console.log(chalk.hex('#5C4033')('Updating package.json settings'));
  console.log(chalk.blue('Reading package.json..'));
  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const newPackageJSON1 = updateJestSettings(packageJSON);
  const newPackageJSON2 = updateYarnCommands(newPackageJSON1);
  const newPackageJSON3 = updateNPMRegistry(newPackageJSON2);
  const newPackageJSON4 = updateDeps(newPackageJSON3);
  console.log(chalk.blue('Rewriting package.json..'));
  fs.writeFileSync('./package.json', `${JSON.stringify(newPackageJSON4, null, 2)}\n`);
  console.log(chalk.green.bold('package.json settings updated.'));
}
