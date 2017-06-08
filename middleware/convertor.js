const CurrencyConvertor = require('../lib/currency_convertor')

module.exports = ConvertorMiddleware

function ConvertorMiddleware (from, to) {
  let convertor = new CurrencyConvertor(from, to)

  return function (req, res, next) {
    req.conversions = function () {
      return new Promise((resolve, reject) => {
        let key = 'conversions'
        req.prison.incarcerate(key, (handler) => {
          let done = handler.done.bind(handler)
          convertor.getCurrent().then(done).catch(reject)
        }).once('done', resolve)
      })
    }
    next()
  }
}
