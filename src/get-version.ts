import readProviderPackageJSON from './read-provider-package-json';

const PackageJSON = readProviderPackageJSON() as unknown as {
  version: string;
};

export default function getVersion(): string {
  return PackageJSON.version;
}
