import chalk from 'chalk';
import clearLastLineAndPrint from './print-helpers';
import { readLibFile, readUserFile, writeUserFile } from './file-helpers';

const CodePackageJSON = JSON.parse(readLibFile('../../package.json')) as Record<string, unknown>;

const Scripts = CodePackageJSON.scripts as Record<string, string>;

type PackageJSON = Record<string, unknown>;

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
