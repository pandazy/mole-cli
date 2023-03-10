import { execSync } from 'child_process';
import fs from 'fs';
import { exists, getUserPath, getProcess } from '@pandazy/mole-core/dist/nodejs';
import { ProjectType } from './project-helpers';
import { getProviderPath } from './lib/files';

function makeProject(name: string): string {
  const projectPath = getUserPath(name);
  execSync(`mkdir -p ${projectPath}`, { stdio: 'inherit' });
  return projectPath;
}

function makeStarterKitSrc(projectType: ProjectType): void {
  const kitPath = getProviderPath('starter-kit', projectType);
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
