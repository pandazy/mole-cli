import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcParentDir = path.resolve(__dirname, `../model-settings`);
const destDir = path.resolve(process.cwd());
const titleInfo = chalk.hex('#5C4033');

export default function copyModelSettings() {
  console.log(titleInfo(`Setting up TypeScript configuration for ${destDir}`));
  fs.readdir(srcParentDir, { withFileTypes: true }, (err, srcDirs) => {
    if (err) throw err;

    srcDirs.forEach(srcDir => {
      if (srcDir.isDirectory()) {
        fs.readdir(path.join(srcParentDir, srcDir.name), (err, files) => {
          if (err) throw err;

          files.forEach(file => {
            const src = path.join(srcParentDir, srcDir.name, file);
            // If the file is in the ignores folder, add a dot to the beginning of the filename
            // because normal ignore files will be skipped by npm
            // we use this way to make sure the ignore file in model-settings is included in the package
            const filename = srcDir.name === 'ignores' ? `.${file}` : file;
            const dest = path.join(destDir, filename);
            if (fs.existsSync(dest)) {
              console.log(chalk.cyan.italic(`${filename} already exists, skipping.`));
              return;
            }

            fs.copyFileSync(src, dest);
            console.log(chalk.green.bold(`${filename} created`));
          });
        });
      }
    });
  });
}
