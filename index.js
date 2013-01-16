var express = require('express')
var request = require('request')
var color = require('./lib/color')

var app = express()

app.get('/:url', function (req, res) {
  var url = req.params.url
  
  var start = Date.now()
  
  var timeout = Number.MAX_VALUE
  if ('timeout' in req.query) timeout = req.query.timeout
  
  request(url, { timeout : 5000 }, function (err, _res) {
    if (!err) {
      if('regex' in req.query) err = !_res.body.match(new RegExp(req.query['regex']))
      if('not-regex' in req.query) err = _res.body.match(new RegExp(req.query['not-regex']))
    }
    var dt = timeout - (Date.now() - start)
    res.sendfile(__dirname + '/images/' + color(err, _res? _res.statusCode : null, dt) + '.png')
  })
})

module.exports = app