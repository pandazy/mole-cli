import fs from 'fs';
import {
  getUserPath,
  makeUserDir,
  readUserFile,
  removeUserFile,
  writeUserFile,
} from '@pandazy/mole-core/dist/nodejs/files';

const ROOT = '.pandazy';

const ConfPathMap: Record<ConfType, string[]> = {
  docker: [ROOT, 'docker'],
  handsoff: [ROOT, 'handsoff'],
  _node_modules: [ROOT, '_node_modules'],
  init: [ROOT, 'init'],
};

export type ConfType = 'docker' | 'init' | 'handsoff' | '_node_modules';

export type PandazyConfig = Record<string, string | number>;

export function readPandazyConf(confName: ConfType): string | undefined {
  return readUserFile(...ConfPathMap[confName]);
}

export function writePandazyConf(confName: ConfType, conf: PandazyConfig): void {
  const envContent = Object.entries(conf).reduce(
    (prev, [key, value]) => `${prev}${key}=${value}\n`,
    ''
  );
  makeUserDir(ROOT);
  writeUserFile({
    paths: ConfPathMap[confName],
    content: envContent,
  });
}

export function writePandazyJson(
  confName: ConfType,
  jsonConf: Record<string, string | number>
): void {
  writeUserFile({
    paths: ConfPathMap[confName],
    content: JSON.stringify(jsonConf, null, 2),
  });
}

export function removePandazyConf(confName: ConfType): void {
  removeUserFile({
    paths: ConfPathMap[confName],
  });
}

const YarnLockPath = getUserPath('yarn.lock');

export function hasYarnLock(): boolean {
  return fs.existsSync(YarnLockPath);
}
