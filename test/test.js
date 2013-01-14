var color = require('../lib/color')
var should = require('should')

describe('color', function () {
  it('should show red', function () {
    color({ code : 'ERROR' }).should.equal('red')
    color(null, { statusCode : 500 }).should.equal('red')
  })
  
  it('should show yellow', function () {
    color({ code : 'ETIMEDOUT' }).should.equal('yellow')
    color({ code : 'SOCKETTIMEDOUT' }).should.equal('yellow')
  })
  
  it('should show green', function () {
    color(null, { statusCode : 200 }).should.equal('green')
  })
})