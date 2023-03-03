import path from "path";
import chalk from "chalk";
import { readPandazyConf, writePandazyConf } from "./config-utils.js";
import dotenv from "dotenv";

const pwd = process.cwd();
const pwdBasedName = path.basename(pwd);

const ConfName = 'docker';

export function readDocker() {
  const envContent = readPandazyConf(ConfName);
  return envContent ?
    dotenv.parse(envContent) :
    undefined
}

const DefaultDockerConfig = {
  FOLDER: path.resolve(pwd),
  NODE_MODULES_VOLUME_NAME: `${pwdBasedName}_node_modules`,
  EX_PORT: 3000,
  IN_PORT: 3000,
}

export function writeDocker() {
  writePandazyConf(ConfName, DefaultDockerConfig);
  console.log(chalk.green.bold(`.pandazy/${ConfName} created`));
}
