import packageJSON from '../../package.json';

export const DevDepsMole = Object.freeze(Object.keys(packageJSON.devDependencies));

const DevDepsGatsbyHad = Object.freeze([
  'typescript',
  'ts-jest',
  'jest',
  'tslib'
]);

export const DevDepGatsby = DevDepsMole.filter((dep) => !DevDepsGatsbyHad.includes(dep));

export const ApolloClientDeps = Object.freeze([
  'graphql',
  'gatsby-plugin-apollo',
  '@apollo/client'
]);
