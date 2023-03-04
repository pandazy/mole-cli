import path from 'path';
import fs from 'fs';

const ROOT = './.pandazy';

const rootPath = path.resolve(process.cwd(), ROOT);

export function getConfigPathOf(confName: string): string {
  return path.resolve(rootPath, confName);
}

export function readPandazyConf(confName: string): string | undefined {
  const confPath = getConfigPathOf(confName);
  if (fs.existsSync(confPath)) {
    const conf = fs.readFileSync(confPath, 'utf8');
    return conf;
  }
  return undefined;
}

export function writePandazyConf(confName: string, conf: Record<string, string | number>): void {
  const confPath = getConfigPathOf(confName);
  const envContent = Object.entries(conf).reduce((prev, [key, value]) => `${prev}${key}=${value}\n`, '');
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
  }
  fs.writeFileSync(confPath, envContent, { encoding: 'utf-8' });
}

export function writePandazyJson(confName: string, jsonConf: Record<string, string | number>): void {
  const confPath = getConfigPathOf(confName);
  fs.writeFileSync(confPath, JSON.stringify(jsonConf, null, 2), { encoding: 'utf-8' });
}

export function removePandazyConf(confName: string): void {
  const confPath = getConfigPathOf(confName);
  if (fs.existsSync(confPath)) {
    fs.unlinkSync(confPath);
  }
}

export function hasYarnLock(): boolean {
  return fs.existsSync(path.resolve(process.cwd(), 'yarn.lock'));
}
