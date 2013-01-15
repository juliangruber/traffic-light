module.exports = function (err, status, dt) {
  if (err || status != 200) return 'red'
  if (dt < 0) return 'yellow'
  return 'green'
}