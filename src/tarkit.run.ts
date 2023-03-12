#!/usr/bin/env node

import { print } from '@pandazy/mole-core/dist/nodejs';
import chalk from 'chalk';
import assertMoleCliOnly from './assert-mole-cli-only';
import { tarKit, TarkitType } from './tarkit-helpers';

assertMoleCliOnly();

(['lib', 'srv'] as TarkitType[]).forEach((projectType) => {
  tarKit(projectType);
  print(chalk.blue(`Starter kit [${projectType}] archived.`));
});
