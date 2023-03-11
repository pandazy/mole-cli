import { exists, getUserPath } from '@pandazy/mole-core/dist/nodejs';

export const HuskyInsScript = [
  'yarn husky install',
  'yarn husky add .husky/pre-commit "yarn lint-staged"',
  'yarn husky add .husky/commit-msg "yarn commitlint -e"',
].join(' && ');

export function hasHusky(): boolean {
  return exists(getUserPath('.husky'));
}
