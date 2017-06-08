const _ = require('lodash')
const BTCe = require('./btce')
const Poloniex = require('./poloniex')
const Bittrex = require('./bittrex')

class Client {
  async getCurrentConversions (from, to) {
    let results = await Promise.all([
      BTCe,
      Poloniex,
      Bittrex
    ].map((ClientClass) => {
      let client = new ClientClass()
      return client.getCurrentConversions(from, to)
    }))

    return _.chain(results)
      .flatten()
      .groupBy((val) => { return val.to })
      .value()
  }
}

module.exports = Client
