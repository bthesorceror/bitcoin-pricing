const BTCe = require('./lib/btce')

let client = new BTCe()

client.getCurrentConversions('btc', ['ltc', 'eth', 'dsh'], function (err, data) {
  if (err) {
    console.error(err)
  }

  console.log(data)
})
