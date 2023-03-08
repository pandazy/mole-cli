import { ProjectType } from './project-helpers';
import readLibPackageJSON from './read-lib-package-json';

const LibPackageJSON = readLibPackageJSON() as unknown as {
  devDependencies: Record<string, string>;
};

export const DevDepsMole = Object.freeze(
  Object.keys(LibPackageJSON.devDependencies as unknown as Record<string, string>)
);

const DevDepsMap: Record<ProjectType, readonly string[]> = {
  lib: DevDepsMole,
  webui: DevDepsMole,
  srv: DevDepsMole,
};

export function getDevDeps(projectType: ProjectType): readonly string[] {
  return DevDepsMap[projectType];
}

export const ApolloClientDeps = Object.freeze([
  'graphql',
  'gatsby-plugin-apollo',
  '@apollo/client',
]);
