import { execSync } from 'child_process';
import { readPandazyConf, removePandazyConf } from './config-utils.js';
import { DevDeps, DevDepsNonGatsby } from './dep-list.constant.js';

const ConfName = '_node_modules';
const ModuleListingCmd = 'mole-modules'

function getNodeModulesInVolume() {
  // print node_modules in volume and save it to pandazy conf and read it
  // because the stdout of the container is not TTY
  execSync(ModuleListingCmd, { 'stdio': 'inherit' });

  // read node_modules in volume from pandazy conf and remove the cached result file
  const nodeModules = readPandazyConf(ConfName).split('\r\n')
    .filter((item) => typeof item === 'string' && item.length > 0);
  removePandazyConf(ConfName);
  return nodeModules;
}

export default function hasMissingPackagesInVolume(isGatsby = false) {
  const volumePackages = getNodeModulesInVolume();
  return [
    ...DevDeps,
    ...isGatsby ? [] : DevDepsNonGatsby
  ].some((dep) => !volumePackages.includes(dep))
}
