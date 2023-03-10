import { execSync } from 'child_process';
import fs from 'fs';
import { exists, getLibPath, getUserPath } from '@pandazy/mole-core/dist/nodejs/files';
import { getProcess } from '@pandazy/mole-core/dist/nodejs/globals';
import { ProjectType } from './project-helpers';

function makeProject(name: string): string {
  const projectPath = getUserPath(name);
  execSync(`mkdir -p ${projectPath}`, { stdio: 'inherit' });
  return projectPath;
}

function makeStarterKitSrc(projectType: ProjectType): void {
  const kitPath = getLibPath('../../starter-kit', projectType);
  const targetPath = getUserPath('src');
  if (!exists(targetPath)) {
    fs.mkdirSync(targetPath);
  }
  execSync(`cp -r ${kitPath}/*.* ${targetPath}/`, { stdio: 'inherit' });
}

export default async function buildStarterKit(
  projectName: string,
  projectType: ProjectType
): Promise<void> {
  makeProject(projectName);
  getProcess().chdir(projectName);
  makeStarterKitSrc(projectType);
  execSync(`mole update --pt ${projectType} -n ${projectName}`, { stdio: 'inherit' });
}
