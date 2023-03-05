import fs from "fs";
import path from "path";
import { getProcess, getLibDir } from "./global-helpers";

export function getUserPath(relativePath: string): string {
  return path.resolve(getProcess().cwd(), relativePath);
}

export function getLibPath(relativePath: string): string {
  return path.resolve(getLibDir(), relativePath);
}

function readFile(readPath: (relPath: string) => string, relPath: string): string {
  const filePath = readPath(relPath);
  if (!fs.existsSync(filePath)) {
    return "";
  }
  return fs.readFileSync(filePath, "utf8");
}

export function readLibFile(relativePath: string): string {
  return readFile(getLibPath, relativePath);
}

export function readUserFile(relativePath: string): string {
  return readFile(getUserPath, relativePath);
}

export function writeUserFile(relativePath: string, content: string): void {
  fs.writeFileSync(getUserPath(relativePath), content, { encoding: "utf8" });
}

export function writeLibFile(relativePath: string, content: string): void {
  fs.writeFileSync(getLibPath(relativePath), content, { encoding: "utf8" });
}

export function removeUserFile(relativePath: string, afterRemoval?: (filePath: string) => void): void {
  const filePath = getUserPath(relativePath);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    afterRemoval?.(filePath);
  }
}
