import chalk from 'chalk';
import {
  extractForUserScripts,
  PackageJSON,
  print,
  readUserFile,
  writeUserFile,
} from '@pandazy/mole-core/dist/nodejs';
import { ProjectType } from './project-helpers';
import extractUserDeps from './extract-user-deps';
import readProviderPackageJSON from './read-provider-package-json';

const CodePackageJSON = readProviderPackageJSON();

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

function getDefaultPackageJSON(projectName: string): PackageJSON {
  return {
    name: `${projectName}`,
    version: '0.1.0',
    description: 'UPDATE ME',
    main: 'dist/index.js',
    license: 'MIT',
    scripts: {},
  };
}

export default function updatePackageJSONSettings(
  projectType: ProjectType,
  projectName?: string
): void {
  const jsonReadouts = readUserFile('package.json');
  if (!jsonReadouts && !projectName) {
    throw new Error('No package.json found and no project name provided.');
  }
  const userPackageJSON = jsonReadouts
    ? (JSON.parse(jsonReadouts) as PackageJSON)
    : getDefaultPackageJSON(projectName as string);
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
