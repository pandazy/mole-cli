import { getUserPath } from '@pandazy/mole-core/dist/nodejs';
import { execSync } from 'child_process';

export function tar(packagePath: string, source: string): Buffer {
  return execSync(`tar -czf  ${packagePath} ${source}`, { stdio: 'inherit' });
}

const UserRoot = getUserPath('.');

export function untar(packagePath: string, targetPath = UserRoot): Buffer {
  return execSync(`tar -xzf ${packagePath} -C ${targetPath}`, { stdio: 'inherit' });
}
