#! /usr/bin/env node

const { readFileSync } = require('fs');

const typescript = require('typescript');
const { transpileModule } = typescript;

const code = String(readFileSync('./app.module.ts'));

console.log(transpileModule(code));