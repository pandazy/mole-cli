import { PackageJSON } from '@pandazy/mole-core/dist/nodejs/package-json';
import { readLibFile } from '@pandazy/mole-core/dist/nodejs/files';

/**
 * To avoid duplicating the package.json file in build, we dynamically read it.
 */
export default function readLibPackageJSON(): PackageJSON {
  return JSON.parse(readLibFile('../../package.json')) as unknown as PackageJSON;
}
