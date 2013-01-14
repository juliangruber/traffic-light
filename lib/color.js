module.exports = function (err, res) {
  var color = 'red'
  if (err && err.code.match(/TIMEDOUT/)) color = 'yellow'
  if (!err && res && res.statusCode == 200) color = 'green'
  return color
}