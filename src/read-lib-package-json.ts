import { readLibFile } from './lib/file-helpers';

export type PackageJSON = Record<string, unknown>;

/**
 * To avoid duplicating the package.json file in build, we dynamically read it.
 */
export default function readLibPackageJSON(): PackageJSON {
  return JSON.parse(readLibFile('../../package.json')) as unknown as PackageJSON;
}
