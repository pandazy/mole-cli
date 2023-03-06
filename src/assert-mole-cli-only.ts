import readUserPackageJSON from './lib/read-user-package-json';

const packageJSON = readUserPackageJSON();

export default function assertMoleCliOnly(): void {
  if (packageJSON?.name !== '@pandazy/mole-cli') {
    throw new Error('this can only be used within @pandazy/mole-cli');
  }
}
