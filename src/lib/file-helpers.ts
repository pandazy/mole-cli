import fs from 'fs';
import path from 'path';
import { getProcess, getLibDir } from './global-helpers';

export function getUserPath(...paths: string[]): string {
  return path.resolve(getProcess().cwd(), ...paths);
}

export function getLibPath(...paths: string[]): string {
  return path.resolve(getLibDir(), ...paths);
}

export function justRead(...paths: string[]): string {
  const filePath = path.resolve(...paths);
  if (!fs.existsSync(filePath)) {
    return '';
  }
  return fs.readFileSync(filePath, 'utf8');
}

export function readLibFile(...paths: string[]): string {
  return justRead(
    getLibPath(...paths)
  );
}

export function readUserFile(...paths: string[]): string {
  return justRead(
    getUserPath(...paths)
  );
}

export function makeUserDir(...paths: string[]): void {
  const dirPath = getUserPath(...paths);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export interface WriteFileOptions {
  paths: string[];
  content: string;
}

export function writeUserFile({ paths, content }: WriteFileOptions): void {
  fs.writeFileSync(getUserPath(...paths), content, { encoding: 'utf8' });
}

export interface RemoveFileOptions {
  paths: string[];
  afterRemoval?: (filePath: string) => void;
}

export function removeUserFile({ paths, afterRemoval }: RemoveFileOptions): void {
  const filePath = getUserPath(...paths);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    afterRemoval?.(filePath);
  }
}
