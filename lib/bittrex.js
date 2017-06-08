const _ = require('lodash')
const axios = require('axios')
const Decimal = require('decimal.js')

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

  async _getCurrentConversion (from, to) {
    let conversion = this._getConversionConfig(from, to)

    if (!conversion) {
      throw new Error('Could not convert currencies')
    }

    let url = `${config.baseUrl}/getticker?market=${conversion.pair}`
    let response = await axios.get(url)

    return this._ticker(from, to, response.data, conversion.invert)
  }

  getCurrentConversions (from, to) {
    return Promise.all(to.map((currentTo) => {
      return this._getCurrentConversion(from, currentTo)
    }))
  }
}

module.exports = Bittrex
