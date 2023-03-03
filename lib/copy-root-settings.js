import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcParentDir = path.resolve(__dirname, `../new-lib-root`);
const destDir = path.resolve(process.cwd());
const titleInfo = chalk.hex('#5C4033');

export default function copyRootSettings() {
  console.log(titleInfo(`Setting up TypeScript configuration for ${destDir}`));

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
        console.log(chalk.green.bold(`${filename} created`));
      });
    }
  });
}
