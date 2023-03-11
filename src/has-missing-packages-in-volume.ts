import { execSync } from 'child_process';
import { ProjectType } from 'project-helpers';
import { readPandazyConf, removePandazyConf } from './config-utils';
import { getDevDeps } from './dep-list-constant';

const ConfName = '_node_modules';
const ModuleListingCmd = 'mole-modules';

function getAllNodeModulesInVolume(): string[] {
  // print node_modules in volume and save it to pandazy conf and read it
  // because the stdout of the container is not TTY
  execSync(ModuleListingCmd, { stdio: 'inherit' });

  // read node_modules in volume from pandazy conf and remove the cached result file
  const nodeModules = (readPandazyConf(ConfName) ?? '')
    .split('\r\n')
    .filter((item) => typeof item === 'string' && item.length > 0);
  removePandazyConf(ConfName);
  return nodeModules;
}

export default function hasMissingPackagesInVolume(projectType: ProjectType): boolean {
  const volumePackages = getAllNodeModulesInVolume();
  const deps = getDevDeps(projectType);
  return deps.some((dep) => !volumePackages.includes(dep));
}
