import { execSync } from 'child_process';
import { readPandazyConf, removePandazyConf } from './config-utils';
import { DevDepGatsby, DevDepsMole } from './dep-list-constant';

const ConfName = '_node_modules';
const ModuleListingCmd = 'mole-modules';

function getNodeModulesInVolume(): string[] {
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

export default function hasMissingPackagesInVolume(isGatsby = false): boolean {
  const volumePackages = getNodeModulesInVolume();
  const depsToCheck = isGatsby ? DevDepGatsby : DevDepsMole;
  return depsToCheck.some((dep) => !volumePackages.includes(dep));
}
