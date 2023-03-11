import dotenv from 'dotenv';
import { getNodeModuleVolume } from '@pandazy/mole-core/dist/nodejs';
import { ConfType, PandazyConfig, readPandazyConf, writePandazyConf } from './config-utils';

const ConfName: ConfType = 'handsoff';

export interface HandsoffConfig extends PandazyConfig {
  NODE_MODULE_VOLUME: string;
}

export function readHandsoff(): HandsoffConfig | undefined {
  const envContent = readPandazyConf(ConfName);
  return envContent ? (dotenv.parse(envContent) as unknown as HandsoffConfig) : undefined;
}

export function writeHandsoff(): void {
  writePandazyConf(ConfName, {
    NODE_MODULE_VOLUME: getNodeModuleVolume(),
  } as HandsoffConfig);
}
