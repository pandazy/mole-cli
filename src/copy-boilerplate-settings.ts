import fs from 'fs';
import chalk from 'chalk';
import { print } from '@pandazy/mole-core/dist/nodejs/prints';
import { exists, getUserPath, pathResolve } from '@pandazy/mole-core/dist/nodejs/files';
import { getProviderPath } from './lib/files';
import { BoilerplateType, ProjectType } from './project-helpers';

const destDir = getUserPath('.');

export type PackName = ProjectType | 'common';

export default function copyBoilerplateSettings(boilerplateType: BoilerplateType): void {
  const srcParentDir = getProviderPath('boilerplate', boilerplateType);
  if (!exists(srcParentDir)) {
    return;
  }
  fs.readdirSync(srcParentDir, { withFileTypes: true }).forEach((srcDir) => {
    if (srcDir.isDirectory()) {
      fs.readdirSync(pathResolve(srcParentDir, srcDir.name)).forEach((file) => {
        const src = pathResolve(srcParentDir, srcDir.name, file);
        // If the file is in the dotfiles folder, add a dot to the beginning of the filename
        // because some dot files like .gitignore will be skipped by npm
        // we use this way to make sure the ignore file in new-lib-root is included in the package
        const filename = srcDir.name === 'dotfiles' ? `.${file}` : file;
        const dest = pathResolve(destDir, filename);
        fs.copyFileSync(src, dest);
      });
    }
  });
  print(chalk.green.bold(`Basic development settings created [${boilerplateType}]`));
}
