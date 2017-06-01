const _ = require('lodash')
const Client = require('./client')

class CurrencyConvertor {
  constructor (from, to) {
    this.from = from
    this.to = to
    this.client = new Client()
  }

  _computeMax (values) {
    return _.maxBy(values, (value) => { return value.last })
  }

  _fetch (callback) {
    this.client.getCurrentConversions(
      this.from,
      this.to,
      callback
    )
  }

  getCurrent (callback) {
    this._fetch((err, results) => {
      if (err) { return callback(err) }

      let maxValues = _.reduce(_.keys(results), (acc, key) => {
        acc[key] = this._computeMax(results[key])
        return acc
      }, {})

      let final = { best: maxValues, all: results }

      callback(null, final)
    })
  }
}

module.exports = CurrencyConvertor
