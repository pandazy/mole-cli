import path from 'path';
import fs from 'fs';

const ROOT = './.pandazy';

const rootPath = path.resolve(process.cwd(), ROOT);

export function getConfigPathOf(confName) {
  return path.resolve(rootPath, confName);
}

export function readPandazyConf(confName) {
  const confPath = getConfigPathOf(confName);
  if (fs.existsSync(confPath)) {
    const conf = fs.readFileSync(confPath, 'utf8');
    return conf;
  }
  return;
}

export function writePandazyConf(confName, conf) {
  const confPath = getConfigPathOf(confName);
  const envContent = Object.entries(conf).reduce((prev, [key, value]) => {
    return `${prev}${key}=${value}\n`;
  }, '');
  if (!fs.existsSync(rootPath)) {
    fs.mkdirSync(rootPath, { recursive: true });
  }
  fs.writeFileSync(confPath, envContent, { encoding: 'utf-8' });
}

export function writePandazyJson(confName, jsonConf) {
  const confPath = getConfigPathOf(confName);
  fs.writeFileSync(confPath, JSON.stringify(jsonConf, null, 2), { encoding: 'utf-8' });
}

export function removePandazyConf(confName) {
  const confPath = getConfigPathOf(confName);
  if (fs.existsSync(confPath)) {
    fs.unlinkSync(confPath);
  }
}
