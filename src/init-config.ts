import dotenv from 'dotenv';
import { ProjectType } from 'project-helpers';
import { ConfType, PandazyConfig, readPandazyConf, writePandazyConf } from './config-utils';

const ConfName: ConfType = 'init';

export interface InitConfig extends PandazyConfig {
  projectType: ProjectType;
}

export function readInit(): InitConfig | undefined {
  const envContent = readPandazyConf(ConfName);
  return envContent ? (dotenv.parse(envContent) as unknown as InitConfig) : undefined;
}

export function writeInit(config: InitConfig): void {
  writePandazyConf(ConfName, config);
}
