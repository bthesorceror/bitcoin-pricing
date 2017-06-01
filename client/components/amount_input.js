const React = require('react')
const Store = require('../store')

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

module.exports = AmountInput
