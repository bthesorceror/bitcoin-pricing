// const BTCe = require('./lib/btce')
// const Poloniex = require('./lib/poloniex')
const Client = require('./lib/client')

let client = new Client()
let from = 'btc'
let to = ['ltc', 'eth', 'dsh']

client.getCurrentConversions(from, to, (err, data) => {
  if (err) {
    return console.error(err)
  }

  console.log(data)
})
