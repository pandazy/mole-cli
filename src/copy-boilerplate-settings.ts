import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { print } from '@pandazy/mole-core/dist/nodejs/prints';
import { getLibDir } from '@pandazy/mole-core/dist/nodejs/globals';
import { exists, getUserPath } from '@pandazy/mole-core/dist/nodejs/files';
import { BoilerplateType, ProjectType } from './project-helpers';

const CodeDirName = getLibDir();

const destDir = getUserPath('.');

export type PackName = ProjectType | 'common';

export default function copyBoilerplateSettings(boilerplateType: BoilerplateType): void {
  const srcParentDir = path.resolve(CodeDirName, `../../boilerplate/${boilerplateType}`);
  if (!exists(srcParentDir)) {
    return;
  }
  fs.readdirSync(srcParentDir, { withFileTypes: true }).forEach((srcDir) => {
    if (srcDir.isDirectory()) {
      fs.readdirSync(path.join(srcParentDir, srcDir.name)).forEach((file) => {
        const src = path.join(srcParentDir, srcDir.name, file);
        // If the file is in the dotfiles folder, add a dot to the beginning of the filename
        // because some dot files like .gitignore will be skipped by npm
        // we use this way to make sure the ignore file in new-lib-root is included in the package
        const filename = srcDir.name === 'dotfiles' ? `.${file}` : file;
        const dest = path.join(destDir, filename);
        fs.copyFileSync(src, dest);
      });
    }
  });
  print(chalk.green.bold(`Basic development settings created [${boilerplateType}]`));
}
