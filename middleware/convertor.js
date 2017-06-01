const CurrencyConvertor = require('../lib/currency_convertor')

module.exports = ConvertorMiddleware

function ConvertorMiddleware (from, to) {
  let convertor = new CurrencyConvertor(from, to)

  return function (req, res, next) {
    req.convertor = convertor
    next()
  }
}
