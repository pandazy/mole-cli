import readPackageJSON from './read-package-json';

const PackageJSON = readPackageJSON() as unknown as {
  version: string;
};

export default function getVersion(): string {
  return PackageJSON.version;
}
