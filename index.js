#!/usr/bin/env node
const program = require('commander')
const init = require('./src/init')

program
  .version('0.0.1')
  .usage('[options]')
  .parse(process.argv)

init(program)