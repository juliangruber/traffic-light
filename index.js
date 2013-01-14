var express = require('express')
var request = require('request')

var app = express()
module.exports = app

app.get(/(http|https):\/\/([a-z0-9\.\/\?]+)/, function (req, res, next) {
  var url = req.params[0] + '://' + req.params[1]
  
  var opts = {}
  if ('timeout' in req.query) opts.timeout = req.query.timeout
  
  request(url, opts, function (err, response, body) {
    var color = 'red'
    if (err && err.code.match(/TIMEDOUT/)) color = 'yellow'
    if (!err && response && response.statusCode == 200) color = 'green'
    
    res.sendfile(__dirname + '/images/' + color + '.png')
  })
})