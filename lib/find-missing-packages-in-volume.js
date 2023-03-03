import { execSync } from 'child_process';
import { readPandazyConf, removePandazyConf } from './config-utils';
import { DevDeps, DevDepsNonGatsby } from './dep-list.constant';

const ConfName = '_node_modules';

function getNodeModulesInVolume() {
  // print node_modules in volume and save it to pandazy conf and read it
  // because the stdout of the container is not TTY
  execSync('npx @pandazy/mole-cli/prt-nm', { 'stdio': 'inherit' });

  // read node_modules in volume from pandazy conf and remove the cached result file
  const nodeModules = readPandazyConf(ConfName).split('\n');
  removePandazyConf(ConfName);
  return nodeModules;
}

export default function findMissingPackagesInVolume(isGatsby = false) {
  const volumePackages = getNodeModulesInVolume();
  return [
    ...DevDeps,
    ...isGatsby ? [] : DevDepsNonGatsby
  ].some((dep) => {
    if (!volumePackages.includes(dep)) {
      console.log(dep);
    }
  })
}
