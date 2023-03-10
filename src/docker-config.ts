import chalk from 'chalk';
import dotenv from 'dotenv';
import { print } from '@pandazy/mole-core/dist/nodejs';
import { runDocker } from './lib/run-docker';
import { PandazyConfig, readPandazyConf, writePandazyConf } from './config-utils';

const ConfName = 'docker';

export interface DockerConfig extends PandazyConfig {
  EX_PORT: number;
  IN_PORT: number;
}

export function readDocker(): DockerConfig | undefined {
  const envContent = readPandazyConf(ConfName);
  return envContent ? (dotenv.parse(envContent) as unknown as DockerConfig) : undefined;
}

const DefaultDockerConfig: DockerConfig = {
  EX_PORT: 3000,
  IN_PORT: 3000,
};

export function writeDocker(): void {
  writePandazyConf(ConfName, DefaultDockerConfig);
  print(chalk.green.bold(`Docker settings created`));
}

function getNewDockerConfig(): DockerConfig {
  writeDocker();
  return readDocker() as DockerConfig;
}

export function runDockerWithPandazyConfig(cmd: string): void {
  const dockerConf = readDocker();
  const checkedConfig = dockerConf ?? getNewDockerConfig();
  runDocker(cmd, {
    shareNpmrc: true,
    exPort: checkedConfig.EX_PORT,
    inPort: checkedConfig.IN_PORT,
  });
}
