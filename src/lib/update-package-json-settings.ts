import chalk from 'chalk';
import clearLastLineAndPrint from './print-helpers';
import { readUserFile, writeUserFile } from './file-helpers';
import Scripts from '../resources/scripts.json';
import readLibPackageJSON, { PackageJSON } from './read-lib-package-json';

const CodePackageJSON = readLibPackageJSON();

function updateNPMRegistry(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    publishConfig: {
      ...(CodePackageJSON.publishConfig ?? {}),
      registry: 'https://npm.pkg.github.com',
    },
  };
}

function updateYarnCommands(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    scripts: {
      ...(CodePackageJSON.scripts || {}),
      ...Scripts,
    },
  };
}

function updateGitHooks(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    husky: {
      ...(packageJSON.husky ?? {}),
      ...(CodePackageJSON.husky ?? {}),
    },
    'lint-staged': {
      ...(packageJSON['lint-staged'] ?? {}),
      ...(CodePackageJSON['lint-staged'] ?? {}),
    },
  };
}

export default function updatePackageJSONSettings(): void {
  const userPackageJSON = JSON.parse(readUserFile('package.json')) as PackageJSON;
  const finalJSON = [updateNPMRegistry, updateYarnCommands, updateGitHooks].reduce(
    (packageJSON, update) => update(packageJSON),
    userPackageJSON
  );
  writeUserFile({
    paths: ['package.json'],
    content: `${JSON.stringify(finalJSON, null, 2)}\n`,
  });
  clearLastLineAndPrint(chalk.green.bold('package.json settings updated.'));
}
