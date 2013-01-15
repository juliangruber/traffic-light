var color = require('../lib/color')
var should = require('should')
var express = require('express')
var request = require('supertest')
var light = require('..')
var fs = require('fs')

var red = fs.readFileSync(__dirname + '/../images/red.png')
var yellow = fs.readFileSync(__dirname + '/../images/yellow.png')
var green = fs.readFileSync(__dirname + '/../images/green.png')

// color (err, status, dt) -> color

describe('color', function () {
  it('should show red', function () {
    color({}, 200, -1).should.equal('red')
    color(null, 500, -1).should.equal('red')
  })
  
  it('should show yellow', function () {
    color(null, 200, -1).should.equal('yellow')
  })
  
  it('should show green', function () {
    color(null, 200, 0).should.equal('green')
  })
})

describe('service', function () {
  it('should be red when an error occurs', function (done) {
    request(light)
      .get('/"http://localhost:99999"/?timeout=0')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(red.toString())
        done()
      })
  })

  it('should be red when a bad status code is returned', function (done) {
    var app = express()
    app.get('/', function (req, res) {
      res.status(500).end('error')
    })

    var server = app.listen(9990)

    request(light)
      .get('/"http://localhost:9990"/?timeout=0')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(red.toString())
        server.close()
        done()
      })
  })
  
  it('should be yellow when the server takes too long to respond', function (done) {
    var app = express()
    app.get('/', function (req, res) {
      res.end('ok')
    })
    
    var server = app.listen(9990)
    
    request(light)
      .get('/"http://localhost:9990"/?timeout=0')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(yellow.toString())
        server.close()
        done()
      })
  })
  
  it('should be green when the server responds in time', function (done) {
    var app = express()
    app.get('/', function (req, res) {
      res.end('ok')
    })
    
    var server = app.listen(9990)
    
    request(light)
      .get('/"http://localhost:9990"/')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(green.toString())
        server.close()
        done()
      })
  })
})