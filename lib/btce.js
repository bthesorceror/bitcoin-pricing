const _ = require('lodash')
const moment = require('moment')
const axios = require('axios')
const Decimal = require('decimal.js')
const async = require('async')

/*
{ ticker:
  { high: 0.01139,
    low: 0.0108,
    avg: 0.011095,
    vol: 1623.13169,
    vol_cur: 145764.02846,
    last: 0.01126,
    buy: 0.01129,
    sell: 0.01126,
    updated: 1496274183,
    server_time: 1496274185 } }
*/

const config = {
  baseUrl: 'https://btc-e.com/api/2',
  conversion: {
    btc: {
      ltc: {
        pair: 'ltc_btc',
        invert: true
      },
      eth: {
        pair: 'eth_btc',
        invert: true
      },
      dsh: {
        pair: 'dsh_btc',
        invert: true
      }
    }
  }
}

class BTCe {
  _ticker (from, to, data, invert) {
    let last = new Decimal(data.ticker.last)

    if (invert) {
      last = new Decimal(1.0).div(last)
    }

    return {
      market: 'BTC-e',
      last: last.toNumber(),
      from: from,
      to: to,
      serverTime: moment.unix(data.ticker.server_time)
    }
  }

  getCurrentConversion (from, to, callback) {
    let conversion = _.get(config.conversion, `${from}.${to}`)

    if (!conversion) {
      return process.nextTick(() => {
        callback(new Error('Could not convert currencies'))
      })
    }

    let url = `${config.baseUrl}/${conversion.pair}/ticker`

    axios.get(url).then((response) => {
      let value = this._ticker(
        from,
        to,
        response.data,
        conversion.invert
      )

      callback(null, value)
    }).catch(callback)
  }

  getCurrentConversions (from, to, callback) {
    async.map(to, (currentTo, done) => {
      this.getCurrentConversion(from, currentTo, done)
    }, callback)
  }
}

module.exports = BTCe
