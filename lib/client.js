const async = require('async')
const BTCe = require('./btce')
const Poloniex = require('./poloniex')
const _ = require('lodash')

class Client {
  getCurrentConversions (from, to, callback) {
    async.map([
      BTCe,
      Poloniex
    ], (ClientClass, done) => {
      let client = new ClientClass()

      client.getCurrentConversions(from, to, done)
    }, (err, results) => {
      if (err) {
        return callback(err)
      }

      callback(
        null,
        _.chain(results)
          .flatten()
          .groupBy((val) => { return val.to })
          .value()
      )
    })
  }
}

module.exports = Client
