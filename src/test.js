#! /usr/bin/env node

const typescript = require('typescript');

const program = typescript.createProgram(['./app.module.ts'], {maxNodeModuleJsDepth: 1});
const test = program.getSourceFiles()[0].getLastToken();

console.log(test);