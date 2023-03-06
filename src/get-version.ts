import readLibPackageJSON from './read-lib-package-json';

const PackageJSON = readLibPackageJSON() as unknown as {
  version: string;
};

export default function getVersion(): string {
  return PackageJSON.version;
}
