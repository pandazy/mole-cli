import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import clearLastLineAndPrint from './print-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const destDir = path.resolve(process.cwd());

export default function copyBoilerplateSettings(packName) {
  const srcParentDir = path.resolve(__dirname, `../boilerplate/${packName}`);
  fs.readdirSync(srcParentDir, { withFileTypes: true }).forEach(srcDir => {
    if (srcDir.isDirectory()) {
      fs.readdirSync(path.join(srcParentDir, srcDir.name)).forEach(file => {
        const src = path.join(srcParentDir, srcDir.name, file);
        // If the file is in the dotfiles folder, add a dot to the beginning of the filename
        // because some dot files like .gitignore will be skipped by npm
        // we use this way to make sure the ignore file in new-lib-root is included in the package
        const filename = srcDir.name === 'dotfiles' ? `.${file}` : file;
        const dest = path.join(destDir, filename);
        fs.copyFileSync(src, dest);

        clearLastLineAndPrint(chalk.green.bold(`${filename} created`))
      });
    }
  });
  clearLastLineAndPrint(
    chalk.green.bold(`Configuration files created [${packName}]`)
  );
}
