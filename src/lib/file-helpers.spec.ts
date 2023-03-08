import fs from 'fs';
import {
  getLibPath,
  getUserPath,
  writeUserFile,
  makeUserDir,
  readLibFile,
  readUserFile,
  removeUserFile,
  justRead,
  getUserRepoName,
} from './file-helpers';

jest.mock('./global-helpers', () => ({
  getProcess: (): { cwd: () => string } => ({
    cwd: jest.fn().mockReturnValue('/walter'),
  }),
  getLibDir: jest.fn().mockReturnValue('/gus'),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn().mockReturnValue(true),
  readFileSync: jest.fn().mockReturnValue(''),
  writeFileSync: jest.fn(),
  unlinkSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

function asMockFn<T extends (...args: any[]) => any>(fn: T): jest.MockedFunction<T> {
  return fn as unknown as jest.MockedFunction<T>;
}

describe('file-helpers', () => {
  it('should return the lib path', () => {
    expect(getLibPath('mike', 'office')).toBe('/gus/mike/office');
  });

  it('should return the user path', () => {
    expect(getUserPath('jesse')).toBe('/walter/jesse');
  });

  it('should get user repo name', () => {
    expect(getUserRepoName()).toBe('walter');
  });

  it('should read a file', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(true);
    asMockFn(fs.readFileSync).mockImplementation((path): string => `experiment: ${path as string}`);

    const result = justRead(expectedPath);
    expect(result).toBe(`experiment: ${expectedPath}`);
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should return an empty string if file does not exist', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(false);

    const result = justRead(expectedPath);
    expect(result).toBe('');
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should read a lib file', () => {
    const expectedPath = '/gus/mike';
    asMockFn(fs.existsSync).mockReturnValue(true);
    asMockFn(fs.readFileSync).mockImplementation(
      (relPath): string => `errand: ${relPath as string}`
    );

    const result = readLibFile('mike');

    expect(result).toBe(`errand: ${expectedPath}`);
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should read a user file', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(true);
    asMockFn(fs.readFileSync).mockImplementation(
      (relPath): string => `experiment: ${relPath as string}`
    );

    const result = readUserFile('jesse');

    expect(result).toBe(`experiment: ${expectedPath}`);
    expect(asMockFn(fs.existsSync)).toHaveBeenCalledWith(expectedPath);
  });

  it('should make a user directory', () => {
    expect.assertions(2);

    const expectedPath = '/walter/jesse/home';
    asMockFn(fs.existsSync).mockReturnValue(false);
    asMockFn(fs.mkdirSync).mockImplementation((relPath, option): undefined => {
      expect(relPath).toBe(expectedPath);
      expect(option).toEqual({ recursive: true });
      return undefined;
    });

    makeUserDir('jesse', 'home');
  });

  it('should write to a user file', () => {
    expect.assertions(3);

    const expectedPath = '/walter/jesse';
    const expectedContent = 'experiment: jesse';
    asMockFn(fs.writeFileSync).mockImplementation((relPath, content, option): void => {
      expect(relPath).toBe(expectedPath);
      expect(content).toBe(expectedContent);
      expect(option).toEqual({ encoding: 'utf8' });
    });

    writeUserFile({
      paths: ['jesse'],
      content: expectedContent,
    });
  });

  it('should remove a user file', () => {
    expect.assertions(3);

    const expectedPath = '/walter/jesse';
    const afterSpy = jest.fn();
    asMockFn(fs.existsSync).mockReturnValue(true);

    removeUserFile({
      paths: ['jesse'],
      afterRemoval: (filePath: string) => {
        afterSpy();
        expect(filePath).toBe(expectedPath);
      },
    });

    expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
    expect(afterSpy).toHaveBeenCalled();
  });

  it('should remove a user file without passing afterRemoval', () => {
    const expectedPath = '/walter/jesse';
    asMockFn(fs.existsSync).mockReturnValue(true);
    removeUserFile({
      paths: ['jesse'],
    });

    expect(fs.unlinkSync).toHaveBeenCalledWith(expectedPath);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
