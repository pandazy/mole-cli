import { getProcess, getUserPath, tar, untar } from '@pandazy/mole-core/dist/nodejs';
import { ProjectType } from 'project-helpers';
import { getProviderPath } from './lib/files';

const ProviderPathMap: Record<ProjectType, string> = Object.fromEntries(
  (['lib', 'webui', 'srv'] as ProjectType[]).map((projectType) => [
    projectType,
    getProviderPath('dist', `tarkit-${projectType}.tar.gz`),
  ])
) as Record<ProjectType, string>;

export function tarKit(projectType: ProjectType): void {
  getProcess().chdir(getProviderPath('mole-kit', projectType));
  tar(ProviderPathMap[projectType], './');
}

export function untarKit(projectType: ProjectType): void {
  untar(ProviderPathMap[projectType], getUserPath('.'));
}
