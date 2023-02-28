import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import chalk from 'chalk';

const filename = ".pandazy-dev"
const pwd = process.cwd();
const dest = path.join(pwd, filename);
const pwdBasedName = path.basename(pwd);

export function readPandazyDev() {
  const envContent = fs.readFileSync(dest, { encoding: 'utf-8' })
  return envContent ?
    dotenv.parse(envContent) :
    undefined
}

const DEFAULT_PANDAZY_DEV = {
  FOLDER: path.resolve(pwd),
  NODE_MODULES_VOLUME_NAME: `${pwdBasedName}_node_modules`,
  EX_PORT: 3000,
  IN_PORT: 3000,
}

export function writePandazyDev() {
  const envContent = Object.entries(DEFAULT_PANDAZY_DEV).reduce((prev, [key, value]) => {
    return `${prev}${key}=${value}\n`;
  }, '');
  fs.writeFileSync(dest, envContent, { encoding: 'utf-8' });
  console.log(chalk.green.bold(`${filename} created`));
}
