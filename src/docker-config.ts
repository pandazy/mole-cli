import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { print } from './lib/print-helpers';
import { readPandazyConf, writePandazyConf } from './config-utils';

const pwd = process.cwd();
const pwdBasedName = path.basename(pwd);

const ConfName = 'docker';

export type DockerConfigKey = 'FOLDER' | 'NODE_MODULES_VOLUME_NAME' | 'EX_PORT' | 'IN_PORT';

export type DockerConfig = Record<DockerConfigKey, string | number>;

export function readDocker(): DockerConfig | undefined {
  const envContent = readPandazyConf(ConfName);
  return envContent ? (dotenv.parse(envContent) as DockerConfig) : undefined;
}

const DefaultDockerConfig: DockerConfig = {
  FOLDER: path.resolve(pwd),
  NODE_MODULES_VOLUME_NAME: `${pwdBasedName}_node_modules`,
  EX_PORT: 3000,
  IN_PORT: 3000,
};

export function writeDocker(): void {
  writePandazyConf(ConfName, DefaultDockerConfig);
  print(chalk.green.bold(`Docker settings created`));
}
