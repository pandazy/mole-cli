import { readUserFile } from './file-helpers';

export type PackageJSON = Record<string, unknown>;

/**
 * To avoid duplicating the package.json file in build, we dynamically read it.
 */
export default function readPackageJSON(): PackageJSON {
  return JSON.parse(readUserFile('../../package.json')) as unknown as PackageJSON;
}
