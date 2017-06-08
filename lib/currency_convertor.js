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

  _fetch () {
    return this.client.getCurrentConversions(
      this.from,
      this.to,
    )
  }

  async getCurrent () {
    let results = await this._fetch()
    let keys = _.keys(results)

    let maxValues = _.reduce(keys, (acc, key) => {
      acc[key] = this._computeMax(results[key])
      return acc
    }, {})

    return {
      best: maxValues,
      all: results
    }
  }
}

module.exports = CurrencyConvertor
