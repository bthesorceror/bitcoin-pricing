const _ = require('lodash')
const axios = require('axios')
const Decimal = require('decimal.js')
const async = require('async')

/*
{
  "success": true,
    "message": "",
    "result": {
      "Bid": 0.06144881,
        "Ask": 0.06145459,
        "Last": 0.06144881

    }
}
*/

const config = {
  baseUrl: 'https://bittrex.com/api/v1.1/public',
  conversion: {
    btc: {
      ltc: {
        pair: 'BTC-LTC',
        invert: true
      },
      eth: {
        pair: 'BTC-ETH',
        invert: true
      },
      dsh: {
        pair: 'BTC-DASH',
        invert: true
      }
    }
  }
}

class Bittrex {
  _ticker (from, to, data, invert) {
    let last = new Decimal(data.result.Last)

    if (invert) {
      last = new Decimal(1.0).div(last)
    }

    return {
      market: 'Bittrex',
      last: last.toNumber(),
      from: from,
      to: to
    }
  }

  _getConversionConfig (from, to) {
    return _.get(config.conversion, `${from}.${to}`)
  }

  _getCurrentConversion (from, to, callback) {
    let conversion = this._getConversionConfig(from, to)

    if (!conversion) {
      return process.nextTick(() => {
        callback(new Error('Could not convert currencies'))
      })
    }

    let url = `${config.baseUrl}/getticker?market=${conversion.pair}`

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
      this._getCurrentConversion(from, currentTo, done)
    }, callback)
  }
}

module.exports = Bittrex
