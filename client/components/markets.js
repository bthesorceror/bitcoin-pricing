const React = require('react')
const Store = require('../store')
const _ = require('lodash')
const Market = require('./market')

class Markets extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  onStateChange () {
    this.setState(Store.getAllByMarket())
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
        <Market key={key} market={key} values={current} />
      )
    })
  }

  render () {
    if (_.isEmpty(this.state)) {
      return (<div id='Markets' />)
    }

    return (
      <div id='Markets'>
        {this.rows}
      </div>
    )
  }
}

module.exports = Markets
