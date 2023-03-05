import fs from 'fs';
import path from 'path';
import { getProcess, getLibDir } from './global-helpers';

export function getUserPath(...paths: string[]): string {
  return path.resolve(getProcess().cwd(), ...paths);
}

export function getLibPath(...paths: string[]): string {
  return path.resolve(getLibDir(), ...paths);
}

export function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function justRead(filePath: string): string {
  if (!exists(filePath)) {
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

export function readLibFile(...paths: string[]): string {
  return justRead(getLibPath(...paths));
}

export function readUserFile(...paths: string[]): string {
  return justRead(getUserPath(...paths));
}

export function justMkdir(dirPath: string): void {
  if (!exists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function makeUserDir(...paths: string[]): void {
  const dirPath = getUserPath(...paths);
  justMkdir(dirPath);
}

export function justWriteFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, { encoding: 'utf8' });
}

export interface WriteFileOptions {
  paths: string[];
  content: string;
}

export function writeUserFile({ paths, content }: WriteFileOptions): void {
  justWriteFile(getUserPath(...paths), content);
}

type AfterRemoval = (filePath: string) => void;

export function justRemoveFile(filePath: string, afterRemoval?: AfterRemoval): void {
  if (exists(filePath)) {
    fs.unlinkSync(filePath);
    afterRemoval?.(filePath);
  }
}

export interface RemoveFileOptions {
  paths: string[];
  afterRemoval?: (filePath: string) => void;
}

export function removeUserFile({ paths, afterRemoval }: RemoveFileOptions): void {
  const filePath = getUserPath(...paths);
  justRemoveFile(filePath, afterRemoval);
}
