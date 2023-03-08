import chalk from 'chalk';
import { ProjectType } from './project-helpers';
import extractUserDeps from './extract-user-deps';
import extractForUserScripts from './lib/extract-for-user-scripts';
import { print } from './lib/print-helpers';
import { readUserFile, writeUserFile } from './lib/file-helpers';
import readLibPackageJSON from './read-lib-package-json';
import { PackageJSON } from './lib/read-user-package-json';

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

function replaceChmodx(script: string): string {
  return script.replaceAll(' && yarn chmodx', '');
}

function updateScripts(packageJSON: PackageJSON): PackageJSON {
  return {
    ...packageJSON,
    scripts: extractForUserScripts(CodePackageJSON, {
      excludes: new Set(['chmodx']),
      specials: {
        build: replaceChmodx,
      },
    }),
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

function updateDevDeps(packageJSON: PackageJSON, projectType: ProjectType): PackageJSON {
  const existingDevDeps = (packageJSON.devDependencies ?? {}) as Record<string, string>;
  return {
    ...packageJSON,
    devDependencies: extractUserDeps(projectType, existingDevDeps),
  };
}

export default function updatePackageJSONSettings(projectType: ProjectType): void {
  const userPackageJSON = JSON.parse(readUserFile('package.json')) as PackageJSON;
  const json1 = [updateNPMRegistry, updateScripts, updateGitHooks].reduce(
    (packageJSON, update) => update(packageJSON),
    userPackageJSON
  );
  const finalJSON = updateDevDeps(json1, projectType);
  writeUserFile({
    paths: ['package.json'],
    content: `${JSON.stringify(finalJSON, null, 2)}\n`,
  });
  print(chalk.green.bold('package.json settings updated.'));
}
