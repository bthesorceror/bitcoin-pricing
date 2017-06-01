const CurrencyConvertor = require('./lib/currency_convertor')

let from = 'btc'
let to = ['ltc', 'eth', 'dsh']
let convertor = new CurrencyConvertor(from, to)

convertor.getCurrent((err, data) => {
  if (err) { return console.error(err) }

  console.dir(data)
  console.dir(data.all)
})
