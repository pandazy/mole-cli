#!/usr/bin/env node

import yargs from 'yargs/yargs';
import runCommand from './lib/run-command.js';
import initializeSettings from './lib/initialize-settings.js';
import packageJSON from './package.json' assert { type: 'json' };

