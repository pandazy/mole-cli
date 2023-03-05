import { readLibFile } from './file-helpers';

/**
 * To avoid duplicating the package.json file in build, we dynamically read it.
 */
const LibPackageJSON = JSON.parse(readLibFile('../../package.json')) as unknown as {
  devDependencies: Record<string, string>;
};

export const DevDepsMole = Object.freeze(
  Object.keys(LibPackageJSON.devDependencies as unknown as Record<string, string>)
);

const DevDepsGatsbyHad = Object.freeze(['typescript', 'ts-jest', 'jest', 'tslib']);

export const DevDepGatsby = DevDepsMole.filter((dep) => !DevDepsGatsbyHad.includes(dep));

export const ApolloClientDeps = Object.freeze([
  'graphql',
  'gatsby-plugin-apollo',
  '@apollo/client',
]);
