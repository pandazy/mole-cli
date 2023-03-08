import dotenv from 'dotenv';
import { NodeModuleVolume } from './lib/run-docker';
import { ConfType, PandazyConfig, readPandazyConf, writePandazyConf } from './config-utils';

const ConfName: ConfType = 'handsoff';

export interface HandsoffConfig extends PandazyConfig {
  NODE_MODULE_VOLUME: string;
}

const DefaultReservedConfig: HandsoffConfig = {
  NODE_MODULE_VOLUME: NodeModuleVolume,
};

export function readHandsoff(): HandsoffConfig | undefined {
  const envContent = readPandazyConf(ConfName);
  return envContent ? (dotenv.parse(envContent) as unknown as HandsoffConfig) : undefined;
}

export function writeHandsoff(): void {
  writePandazyConf(ConfName, DefaultReservedConfig);
}
