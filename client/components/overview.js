const React = require('react')

const BestPrices = require('./best_prices')
const Markets = require('./markets')
const Currencies = require('./currencies')
const AmountInput = require('./amount_input')

class Overview extends React.Component {
  render () {
    return (
      <div>
        <AmountInput />
        <h3>Best Prices</h3>
        <BestPrices />
        <h3>Markets</h3>
        <Markets />
        <h3>Currencies</h3>
        <Currencies />
      </div>
    )
  }
}

module.exports = Overview
