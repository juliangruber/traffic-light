#!/usr/bin/env node

var traffic = require('..')
var optimist = require('optimist')

var argv = optimist
  .usage('Start traffic-light server.\nUsage: $0 [options]')
  .describe('port', 'Port to listen on')
  .default('port', 4000)
  .alias('p', 'port')
  .describe('help', 'Print usage instructions')
  .argv
  
if (argv.help) return optimist.showHelp()

traffic.listen(argv.port, function () {
  console.log('traffic-light listening on port ' + argv.port)
})