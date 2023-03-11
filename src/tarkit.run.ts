#!/usr/bin/env node

import { print } from '@pandazy/mole-core/dist/nodejs';
import chalk from 'chalk';
import assertMoleCliOnly from './assert-mole-cli-only';
import { ProjectType } from './project-helpers';
import { tarKit } from './tarkit-helpers';

assertMoleCliOnly();

(['lib', 'webui'] as ProjectType[]).forEach((projectType) => {
  tarKit(projectType);
  print(chalk.blue(`Starter kit [${projectType}] archived.`));
});
