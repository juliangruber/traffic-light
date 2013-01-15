var express = require('express')
var app = express()

app.get('/green', function (req, res) {
  res.send('ok')
})

app.get('/red', function (req, res) {
  res.status(500).end('error')
})

app.listen(9990)

module.exports = app