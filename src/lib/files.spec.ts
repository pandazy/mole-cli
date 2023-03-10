import fs from 'fs';
import { getProviderPath, readProviderFile } from './files';

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue(''),
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

jest.mock('./module-root', () => jest.fn().mockReturnValue('/gus'));

function asMockFn<T extends (...args: any[]) => any>(fn: T): jest.MockedFunction<T> {
  return fn as unknown as jest.MockedFunction<T>;
}

describe('files', () => {
  it('should return the lib path', () => {
    expect(getProviderPath('mike', 'office')).toBe('/gus/mike/office');
  });

  it('should read a lib file', () => {
    const expectedPath = '/gus/mike';
    asMockFn(fs.existsSync).mockReturnValue(true);
    asMockFn(fs.readFileSync).mockImplementation(
      (relPath): string => `errand: ${relPath as string}`
    );

    const result = readProviderFile('mike');

    expect(result).toBe(`errand: ${expectedPath}`);
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
