var express = require('express')
var request = require('request')
var color = require('./lib/color')

var app = express()

app.get('/:url', function (req, res) {
  var url = req.params.url
  
  var start = Date.now()
  
  var timeout = Number.MAX_VALUE
  if ('timeout' in req.query) timeout = req.query.timeout
  
  request(url, function (err, _res) {
    var dt = timeout - (Date.now() - start)
    res.sendfile(__dirname + '/images/' + color(err, _res? _res.statusCode : null, dt) + '.png')
  })
})

module.exports = app