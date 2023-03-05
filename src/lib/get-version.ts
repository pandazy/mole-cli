import { readLibFile } from './file-helpers';

const PackageJSON = JSON.parse(readLibFile('../../package.json')) as unknown as {
  version: string;
};

export default function getVersion(): string {
  return PackageJSON.version;
}
