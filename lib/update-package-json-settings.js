import fs from 'fs';
import chalk from 'chalk';
import scripts from './scripts.json' assert { type: "json" };
import devDependencies from './dev-dependencies.json' assert { type: "json" };

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

function updateDevDeps(packageJSON) {
  console.log(chalk.blue('Updating devDependencies..'));
  if (!packageJSON.devDependencies) {
    packageJSON.devDependencies = {};
  }
  Object.entries(devDependencies).forEach(([key, value]) => {
    packageJSON.devDependencies[key] = value;
  });
  return packageJSON;
}

export default function updatePackageJSONSettings() {
  console.log(chalk.hex('#5C4033')('Updating package.json settings'));
  console.log(chalk.blue('Reading package.json..'));
  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  if (packageJSON.moleOn) {
    console.log(chalk.yellow.italic('package.json is already updated (moleOn is true). Skipping..'));
    console.log(chalk.yellow.bold('If you want to update package.json settings, '
      + 'set moleOn to false in package.json and run "mole" again.'));
    return;
  }
  const newPackageJSON1 = updateJestSettings(packageJSON);
  const newPackageJSON2 = updateYarnCommands(newPackageJSON1);
  const newPackageJSON3 = updateDevDeps(newPackageJSON2);
  newPackageJSON3.moleOn = true;
  console.log(chalk.blue('Rewriting package.json..'));
  fs.writeFileSync('./package.json', JSON.stringify(newPackageJSON3, null, 2));
  console.log(chalk.green.bold('package.json settings updated.'));
}