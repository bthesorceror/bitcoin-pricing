const _ = require('lodash')
const axios = require('axios')
const Decimal = require('decimal.js')

const config = {
  baseUrl: 'https://bittrex.com/api/v1.1/public',
  conversions: {
    btc: {
      ltc: { pair: 'BTC-LTC', invert: true },
      eth: { pair: 'BTC-ETH', invert: true },
      dsh: { pair: 'BTC-DASH', invert: true }
    }
  }
}

function getConversion (from, to) {
  return _.get(config.conversions, `${from}.${to}`)
}

function ticker (from, to, data, invert) {
  let last = new Decimal(data.result.Last)

  if (invert) { last = new Decimal(1.0).div(last) }

  return {
    market: 'Bittrex',
    last: last.toNumber(),
    from: from,
    to: to
  }
}

async function currentRate (from, to) {
  let conversion = getConversion(from, to)

  if (!conversion) {
    throw new Error('Could not convert currencies')
  }

  let { pair, invert } = conversion
  let { baseUrl } = config
  let { data } = await axios.get(`${baseUrl}/getticker?market=${pair}`)

  return ticker(from, to, data, invert)
}

class Bittrex {
  getCurrentConversions (from, toList) {
    let fn = currentRate.bind(null, from)
    return Promise.all(toList.map(fn))
  }
}

module.exports = Bittrex
