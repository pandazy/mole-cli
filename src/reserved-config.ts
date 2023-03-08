import dotenv from 'dotenv';
import { NodeModuleVolume } from './lib/run-docker';
import { ConfType, PandazyConfig, readPandazyConf, writePandazyConf } from './config-utils';

const ConfName: ConfType = '_reserved';

export interface ReservedConfig extends PandazyConfig {
  NODE_MODULE_VOLUME: string;
}

const DefaultReservedConfig: ReservedConfig = {
  NODE_MODULE_VOLUME: NodeModuleVolume,
};

export function readReserved(): ReservedConfig | undefined {
  const envContent = readPandazyConf(ConfName);
  return envContent ? (dotenv.parse(envContent) as unknown as ReservedConfig) : undefined;
}

export function writeReserved(): void {
  writePandazyConf(ConfName, DefaultReservedConfig);
}
