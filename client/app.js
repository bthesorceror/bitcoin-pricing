const React = require('react')
const ReactDOM = require('react-dom')
const Store = require('./store')

const BestPrices = require('./components/best_prices')
const Markets = require('./components/markets')

class Overview extends React.Component {
  render () {
    return (
      <div>
        <h3>Best Prices</h3>
        <BestPrices />
        <h3>Markets</h3>
        <Markets />
      </div>
    )
  }
}

ReactDOM.render(
  <Overview />,
  document.querySelector('#content')
)

Store.fetch()
