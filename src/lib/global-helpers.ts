
/**
 * Expose to allow mocking in tests
 * @returns 
 */
export function getProcess(): NodeJS.Process {
  return process;
}

/**
 * Expose to allow mocking in tests
 * @returns 
 */
export function getLibDir(): string {
  // eslint-disable-next-line no-underscore-dangle
  return __dirname;
}
