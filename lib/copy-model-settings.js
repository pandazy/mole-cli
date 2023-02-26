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
            const dest = path.join(destDir, file);
            if (fs.existsSync(dest)) {
              console.log(chalk.cyan.italic(`${file} already exists, skipping.`));
              return;
            }

            fs.copyFileSync(src, dest);
            console.log(chalk.green.bold(`${file} created`));
          });
        });
      }
    });
  });
}
