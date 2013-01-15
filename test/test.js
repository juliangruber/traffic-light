var color = require('../lib/color')
var should = require('should')
var express = require('express')
var request = require('supertest')
var light = require('..')
var fs = require('fs')

var red = fs.readFileSync(__dirname + '/../images/red.png')
var yellow = fs.readFileSync(__dirname + '/../images/yellow.png')
var green = fs.readFileSync(__dirname + '/../images/green.png')

var server = require('./server').listen(9990)
after(function () {
  server.close()
})

describe('color', function () {
  // color (err, status, dt) -> color
  
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

describe('regex', function () {
  it("should be red when the regex isn't matched", function (done) {
     request(light)
       .get('/' + encodeURIComponent("http://localhost:9990/regex-bad") + '/?regex=ok')
       .expect('Content-Type', 'image/png')
       .expect(200)
       .end(function (err, res) {
         if (err) return done(err)
         res.text.should.equal(red.toString())
         done()
       })
   })
   
   it('should be green when the regex is matched', function (done) {
     request(light)
       .get('/' + encodeURIComponent("http://localhost:9990/regex-good") + '/?regex=ok')
       .expect('Content-Type', 'image/png')
       .expect(200)
       .end(function (err, res) {
         if (err) return done(err)
         res.text.should.equal(green.toString())
         done()
       })
   })
})

describe('timeout', function () {
  it('should be yellow when the server takes too long to respond', function (done) {
    request(light)
      .get('/' + encodeURIComponent("http://localhost:9990/green") + '/?timeout=0')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(yellow.toString())
        done()
      })
  })
  
  it('should be green when the server responds in time', function (done) {
    request(light)
      .get('/' + encodeURIComponent("http://localhost:9990/green") + '/?timeout=5000')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(green.toString())
        done()
      })
  })
})

describe('error', function () {
  it('should be red when an error occurs', function (done) {
    request(light)
      .get('/' + encodeURIComponent('http://asdjleifjsludhgkuhldijvlidjkusrhf.com') + '/?timeout=0')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(red.toString())
        done()
      })
  })

  it('should be red when a bad status code is returned', function (done) {
    request(light)
      .get('/' + encodeURIComponent("http://localhost:9990/red") + '/?timeout=0')
      .expect('Content-Type', 'image/png')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err)
        res.text.should.equal(red.toString())
        done()
      })
  })
})