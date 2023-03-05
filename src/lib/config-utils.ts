import path from 'path';
import fs from 'fs';
import { getUserPath, readUserFile } from './file-helpers';

const ROOT = './.pandazy';

export type ConfType = 'docker' | '_node_modules'

const rootPath = getUserPath(ROOT);

export function getConfigPathOf(confName: ConfType): string {
  return path.resolve(rootPath, confName);
}

export function readPandazyConf(confName: ConfType): string | undefined {
  return readUserFile(`${ROOT}/${confName}`);
}

export function writePandazyConf(confName: ConfType, conf: Record<string, string | number>): void {
  const confPath = getConfigPathOf(confName);
  const envContent = Object.entries(conf).reduce((prev, [key, value]) => `${prev}${key}=${value}\n`, '');
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
  }
  fs.writeFileSync(confPath, envContent, { encoding: 'utf-8' });
}

export function writePandazyJson(confName: ConfType, jsonConf: Record<string, string | number>): void {
  const confPath = getConfigPathOf(confName);
  fs.writeFileSync(confPath, JSON.stringify(jsonConf, null, 2), { encoding: 'utf-8' });
}

export function removePandazyConf(confName: ConfType): void {
  const confPath = getConfigPathOf(confName);
  if (fs.existsSync(confPath)) {
    fs.unlinkSync(confPath);
  }
}

export function hasYarnLock(): boolean {
  return fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'));
}
