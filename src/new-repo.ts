import { execSync } from 'child_process';
import { getUserPath, getProcess } from '@pandazy/mole-core/dist/nodejs';
import { untarKit } from './tarkit-helpers';
import { ProjectType } from './project-helpers';

function makeProject(name: string): string {
  const projectPath = getUserPath(name);
  execSync(`mkdir -p ${projectPath}`, { stdio: 'inherit' });
  return projectPath;
}

function startNewProject(projectName: string): void {
  execSync(`npx gatsby new ${projectName}`, { stdio: 'inherit' });
}

const ProjectMakerMap: Record<ProjectType, (projectName: string) => void> = {
  lib: makeProject,
  webui: startNewProject,
  srv: () => {
    throw new Error('Not implemented');
  },
};

export interface NewRepoOptions {
  name: string;
  type: ProjectType;
  noDocker?: boolean;
}

export default async function newRepo({ name, type, noDocker }: NewRepoOptions): Promise<void> {
  ProjectMakerMap[type](name);
  getProcess().chdir(name);
  if (type === 'lib') {
    untarKit('lib');
  }

  const noDockerOption = noDocker ? [' --noDocker'] : [];
  execSync(['mole update', `--pt ${type}`, `-n ${name}`, ...noDockerOption].join(' '), {
    stdio: 'inherit',
  });
}
