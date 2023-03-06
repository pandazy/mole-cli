import { readUserFile } from './file-helpers';

export default function readUserPackageJSON(): Record<string, unknown> {
  return JSON.parse(readUserFile('package.json')) as unknown as Record<string, unknown>;
}
