#!/usr/bin/env node

import { execSync } from 'child_process';
import assertMoleCliOnly from './assert-mole-cli-only';
import { getUserPath } from './lib/file-helpers';

assertMoleCliOnly();

const Executables = ['dist/index.js'];

Executables.forEach((executable) => {
  const executableUserPath = getUserPath(executable);
  execSync(`chmod +x ${executableUserPath}`, { stdio: 'inherit' });
  console.log(`[mole-chmodx] Made ${executableUserPath} executable`);
});
