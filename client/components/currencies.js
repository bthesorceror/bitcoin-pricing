const React = require('react')
const Store = require('../store')
const _ = require('lodash')
const Currency = require('./currency')

class Markets extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onStateChange () {
    this.setState({
      multiplier: Store.multiplier,
      values: Store.allPrices
    })
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
    return _.map(_.keys(this.state.values), (key) => {
      let current = this.state.values[key]
      let elemKey = `currency-${key}`

      return (
        <Currency key={elemKey} currency={key} values={current} multiplier={this.state.multiplier} />
      )
    })
  }

  render () {
    if (_.isEmpty(this.state)) {
      return (<div id='Currencies' />)
    }

    return (
      <div id='Currencies'>
        {this.rows}
      </div>
    )
  }
}

module.exports = Markets
