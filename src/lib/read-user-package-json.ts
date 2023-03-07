import { readUserFile } from './file-helpers';

export type PackageJSON = Record<string, unknown>;

export default function readUserPackageJSON(): PackageJSON {
  return JSON.parse(readUserFile('package.json')) as unknown as PackageJSON;
}
