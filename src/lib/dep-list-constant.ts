export const DevDepsMole = Object.freeze([
  '@commitlint/cli',
  '@commitlint/config-conventional',
  '@pandazy/eslint-config-mole',
  '@pandazy/mole-config',
  '@types/jest',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint',
  'eslint-config-airbnb',
  'eslint-config-airbnb-typescript',
  'eslint-config-prettier',
  'eslint-config-standard',
  'eslint-config-typescript',
  'eslint-plugin-import',
  'eslint-plugin-jest',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-prettier',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-testing-library',
  'husky',
  'jest',
  'lint-staged',
  'prettier',
  'ts-jest',
  'typescript',
]);

const DevDepsGatsbyHad = Object.freeze(['typescript', 'ts-jest', 'jest', 'tslib']);

export const DevDepGatsby = DevDepsMole.filter((dep) => !DevDepsGatsbyHad.includes(dep));

export const ApolloClientDeps = Object.freeze([
  'graphql',
  'gatsby-plugin-apollo',
  '@apollo/client',
]);
