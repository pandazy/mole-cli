import chalk from 'chalk';
import codePackageJSON from '../../package.json';
import clearLastLineAndPrint from './print-helpers';
import { readUserFile, writeUserFile } from './file-helpers';

const Scripts = codePackageJSON.scripts;

type PackageJSON = Record<string, unknown>;

function updateNPMRegistry(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    publishConfig: {
      ...codePackageJSON.publishConfig ?? {},
      registry: 'https://npm.pkg.github.com',
    },
  };
}

function updateYarnCommands(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    scripts: {
      ...codePackageJSON.scripts || {},
      ...Scripts,
    },
  };
}

function updateGitHooks(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    husky: {
      ...packageJSON.husky ?? {},
      ...codePackageJSON.husky ?? {},
    },
    'lint-staged': {
      ...packageJSON['lint-staged'] ?? {},
      ...codePackageJSON['lint-staged'] ?? {},
    },
  };
}

export default function updatePackageJSONSettings(): void {
  const userPackageJSON = JSON.parse(
    readUserFile('package.json')
  ) as PackageJSON;
  const finalJSON = [
    updateNPMRegistry,
    updateYarnCommands,
    updateGitHooks
  ].reduce(
    (packageJSON, update) => update(packageJSON),
    userPackageJSON
  );
  writeUserFile({
    paths: ['package.json'],
    content: `${JSON.stringify(finalJSON, null, 2)}\n`,
  });
  clearLastLineAndPrint(
    chalk.green.bold('package.json settings updated.')
  );
}
