const Prison = require('prison')

module.exports = PrisonMiddleware

function PrisonMiddleware (timeout) {
  let prison = new Prison(timeout)

  return function (req, res, next) {
    req.prison = prison
    next()
  }
}
