import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcParentDir = path.resolve(__dirname, `../repo-root`);
const destDir = path.resolve(process.cwd());
const titleInfo = chalk.hex('#5C4033');

export default function copyRootSettings(hasForce = false) {
  console.log(titleInfo(`Setting up TypeScript configuration for ${destDir}`));

  let fileSkipped = 0;
  fs.readdirSync(srcParentDir, { withFileTypes: true }).forEach(srcDir => {
    if (srcDir.isDirectory()) {
      fs.readdirSync(path.join(srcParentDir, srcDir.name)).forEach(file => {
        const src = path.join(srcParentDir, srcDir.name, file);
        // If the file is in the dotfiles folder, add a dot to the beginning of the filename
        // because some dot files like .gitignore will be skipped by npm
        // we use this way to make sure the ignore file in repo-root is included in the package
        const filename = srcDir.name === 'dotfiles' ? `.${file}` : file;
        const dest = path.join(destDir, filename);
        if (!hasForce && fs.existsSync(dest)) {
          fileSkipped++;
          console.log(chalk.cyan.italic(`${filename} already exists, skipping.`));
          return;
        }

        fs.copyFileSync(src, dest);
        console.log(chalk.green.bold(`${filename} created`));
      });
    }
  });

  if (fileSkipped) {
    console.log(chalk.yellow.italic(`${fileSkipped} files skipped.`));
    console.log(chalk.yellow.bold('If you want to update the skipped files, '
      + 'please delete them first and run "mole" again.'));
  }
}
