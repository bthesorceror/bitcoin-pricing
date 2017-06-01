const React = require('react')
const ReactDOM = require('react-dom')
const Store = require('./store')

const BestPrices = require('./components/best_prices')
const Markets = require('./components/markets')

class AmountInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {amount: 1.0}
  }

  onChange (evt) {
    let amount = parseFloat(evt.target.value)
    if (amount > 0.0) {
      this.setState({amount: amount})
      Store.setMultiplier(amount)
    }
  }

  render () {
    return (
      <div id='amount-input'>
        <h3>Bitcoin Amount</h3>
        <input type='number' value={this.state.amount} onChange={this.onChange.bind(this)} />
      </div>
    )
  }
}

class Overview extends React.Component {
  render () {
    return (
      <div>
        <AmountInput />
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
