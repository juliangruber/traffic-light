# traffic-light

Monitor the status of your websites and applications with traffic-lights!

![Build Status](https://secure.travis-ci.org/juliangruber/traffic-light.png)](http://travis-ci.org/juliangruber/traffic-light)

```bash
$ traffic-light --port 4000
```

![preview](http://f.cl.ly/items/3E2r0E0F3G0C3r0A0T3X/Screen%20Shot%202013-01-14%20at%205.57.58%20PM.png)

The traffic-light will be

* ![green](https://raw.github.com/juliangruber/traffic-light/master/images/green.png) when the Server responds with code 200 in time
* ![yellow](https://raw.github.com/juliangruber/traffic-light/master/images/yellow.png), when a timeout is triggered
* ![red](https://raw.github.com/juliangruber/traffic-light/master/images/red.png), when there is an error or the response code isn't 200

## url

```
http://traffic-light/"http://address.to/check"
http://traffic-light/"http://address.to/check"?timeout=3000
```

## server

```bash
$ traffic-light --help
Start traffic-light server.
Usage: traffic-light [options]

Options:
  --port, -p  Port to listen on         [default: 4000]
  --help      Print usage instructions

```

## library

`traffic-light` exports an express request handler.

```js
var lights = require('traffic-light')
var express = require('express')
var app = express()

app.use('lights', lights)

app.listen(3000)
```

## installation

As application:

```bash
$ npm install -g traffic-light
```

As library:

```bash
$ npm install traffic-light
```

## license

Copyright (c) 2012 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
