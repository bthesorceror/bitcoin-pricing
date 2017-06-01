// const BTCe = require('./lib/btce')
const Poloniex = require('./lib/poloniex')

let client = new Poloniex()
let from = 'btc'
let to = ['ltc', 'eth', 'dsh']

client.getCurrentConversions(from, to, (err, data) => {
  if (err) {
    return console.error(err)
  }

  console.log(data)
})
