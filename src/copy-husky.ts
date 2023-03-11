import { justMkdir } from '@pandazy/mole-core/dist/nodejs';
import { execSync } from 'child_process';
import { getProviderPath } from './lib/files';

const Basename = '.husky';

export default function copyHusky(): void {
  const providerHuskyPath = getProviderPath(Basename);
  justMkdir(Basename);
  execSync(`cp -r ${providerHuskyPath}/  ${Basename}/`);
}
