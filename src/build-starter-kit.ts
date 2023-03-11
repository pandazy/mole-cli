import { execSync } from 'child_process';
import { getUserPath, getProcess } from '@pandazy/mole-core/dist/nodejs';
import { untarKit } from './tarkit-helpers';
import { ProjectType } from './project-helpers';

function makeProject(name: string): string {
  const projectPath = getUserPath(name);
  execSync(`mkdir -p ${projectPath}`, { stdio: 'inherit' });
  return projectPath;
}

export default async function buildStarterKit(
  projectName: string,
  projectType: ProjectType
): Promise<void> {
  makeProject(projectName);
  getProcess().chdir(projectName);
  untarKit(projectType);
  execSync(`mole update --pt ${projectType} -n ${projectName}`, { stdio: 'inherit' });
}
