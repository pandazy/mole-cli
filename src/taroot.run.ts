#!/usr/bin/env node
import { print } from '@pandazy/mole-core/dist/nodejs';
import chalk from 'chalk';
import { tarRoot } from './taroot-helpers';
import assertMoleCliOnly from './assert-mole-cli-only';

assertMoleCliOnly();

tarRoot();

print(chalk.blue('Root settings (eslint, tsconfig, etc..) archived.'));
