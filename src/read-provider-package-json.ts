import { PackageJSON } from '@pandazy/mole-core/dist/nodejs/package-json';
import { readProviderFile } from './lib/files';

/**
 * To avoid duplicating the package.json file in build, we dynamically read it.
 */
export default function readProviderPackageJSON(): PackageJSON {
  return JSON.parse(readProviderFile('package.json')) as unknown as PackageJSON;
}
