import { justRead } from '@pandazy/mole-core/dist/nodejs';
import path from 'path';
import getModuleRoot from './module-root';

export function getProviderPath(...paths: string[]): string {
  return path.resolve(getModuleRoot(), ...paths);
}

export function readProviderFile(...paths: string[]): string {
  return justRead(getProviderPath(...paths));
}
