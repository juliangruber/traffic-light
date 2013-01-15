var express = require('express')
var app = express()

app.get('/green', function (req, res) {
  res.send('ok')
})

app.get('/red', function (req, res) {
  res.status(500).end('error')
})

app.get('/regex-bad', function (req, res) {
  res.end('an error occured')
})

app.get('/regex-good', function (req, res) {
  res.end('ok')
})

module.exports = app