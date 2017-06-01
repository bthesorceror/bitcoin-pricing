const _ = require('lodash')
const axios = require('axios')
const Decimal = require('decimal.js')

/*
{
  "id": 7,
    "last": "0.00000103",
    "lowestAsk": "0.00000103",
    "highestBid": "0.00000102",
    "percentChange": "-0.05504587",
    "baseVolume": "1237.36422003",
    "quoteVolume": "1152697630.90188003",
    "isFrozen": "0",
    "high24hr": "0.00000115",
    "low24hr": "0.00000099"

}
*/

const config = {
  baseUrl: 'https://poloniex.com/public',
  conversion: {
    btc: {
      ltc: {
        pair: 'BTC_LTC',
        invert: true
      },
      eth: {
        pair: 'BTC_ETH',
        invert: true
      },
      dsh: {
        pair: 'BTC_DASH',
        invert: true
      }
    }
  }
}

class Poloniex {
  _ticker (from, to, data, invert) {
    let last = new Decimal(data.last)

    if (invert) {
      last = new Decimal(1.0).div(last)
    }

    return {
      market: 'Poloniex',
      last: last.toNumber(),
      from: from,
      to: to
    }
  }

  _getConversionConfig (from, to) {
    return _.get(config.conversion, `${from}.${to}`)
  }

  allowed (from, to) {
    return !!this._getConversionConfig(from, to)
  }

  getCurrentConversions (from, to, callback) {
    to = _.filter(to, this.allowed.bind(this, from))

    let url = `${config.baseUrl}?command=returnTicker`

    axios.get(url).then((response) => {
      var value = _.map(to, (current) => {
        let conversion = this._getConversionConfig(
          from,
          current
        )

        return this._ticker(
          from,
          current,
          response.data[conversion.pair],
          conversion.invert
        )
      })

      callback(null, value)
    }).catch(callback)
  }
}

module.exports = Poloniex
