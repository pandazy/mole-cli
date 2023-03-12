import { getProcess, getUserPath, tar, untar } from '@pandazy/mole-core/dist/nodejs';
import { fromEntries } from '@pandazy/mole-core';
import { ProjectType } from 'project-helpers';
import { getProviderPath } from './lib/files';

export type TarkitType = Exclude<ProjectType, 'webui'>;

const ProviderPathMap: Record<TarkitType, string> = fromEntries<string>(
  (['lib', 'srv'] as TarkitType[]).map((projectType) => [
    projectType,
    getProviderPath('dist', `tarkit-${projectType}.tar.gz`),
  ])
) as Record<TarkitType, string>;

export function tarKit(projectType: TarkitType): void {
  getProcess().chdir(getProviderPath('mole-kit', projectType));
  tar(ProviderPathMap[projectType], './');
}

export function untarKit(projectType: TarkitType): void {
  untar(ProviderPathMap[projectType], getUserPath('.'));
}
