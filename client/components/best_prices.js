const _ = require('lodash')
const React = require('react')
const Store = require('../store')

class BestPrices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onStateChange () {
    this.setState(Store.bestPrices)
  }

  componentDidMount () {
    this.changeListener = this.onStateChange.bind(this)
    Store.on('changed', this.changeListener)
  }

  componentWillMount () {
    if (this.changeListener) {
      Store.removeListener('changed', this.changeListener)
    }
  }

  get rows () {
    return _.map(_.keys(this.state), (key) => {
      let current = this.state[key]
      return (
        <tr key={key}>
          <td>{current.market}</td>
          <td>1 {current.from}</td>
          <td>{current.last} {current.to}</td>
        </tr>
      )
    })
  }

  render () {
    if (_.isEmpty(this.state)) {
      return (
        <h1>Currently Loading Prices</h1>
      )
    }

    return (
      <table className='best-prices'>
        <thead>
          <tr>
            <th>Market</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {this.rows}
        </tbody>
      </table>
    )
  }
}

module.exports = BestPrices
