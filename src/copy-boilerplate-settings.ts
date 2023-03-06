import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import clearLastLineAndPrint from './lib/print-helpers';
import { getLibDir } from './lib/global-helpers';
import { exists } from './lib/file-helpers';

const CodeDirName = getLibDir();

const destDir = path.resolve(process.cwd());

export type PackName = 'new-lib-root' | 'new-fe-root' | 'common';

export default function copyBoilerplateSettings(packName: PackName): void {
  const srcParentDir = path.resolve(CodeDirName, `../../boilerplate/${packName}`);
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
  clearLastLineAndPrint(chalk.green.bold(`Basic development settings created [${packName}]`));
}
