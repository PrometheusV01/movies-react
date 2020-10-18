// Instruments
import { resolve } from 'path';

// Core
export const version = require('../package.json').version;
export const sourcePath = resolve(__dirname, '../src');
export const publicPath = resolve(__dirname, '../public');
export const buildPath = resolve(__dirname, '../build', version);
